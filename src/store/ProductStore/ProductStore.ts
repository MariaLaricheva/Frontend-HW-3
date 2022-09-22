import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'models/shared/collectionModel'
import { normalizeProductType, ProductTypeModel } from 'store/models'

import { getCategories, getProductList } from 'utils/fetchApi'
import { Meta } from 'utils/meta'
import { ILocalStore } from 'utils/useLocalStore'
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from 'mobx'

import rootStore from '../RootStore/instance'
import { optionType } from 'components/MultiDropdown/MultiDropdown'

type PrivateFields = '_meta'
  | '_products'
  | '_hasMore'
  | '_limit'
  | '_total'
  | '_ctgMeta'
  | '_categories'
  | '_filter'

/* если нужен - добавить в имплемент после айЛокалСтор
export interface IProductStore {
  getProducts: () => Promise<void>
}
 */

export default class ProductStore implements ILocalStore {
  private _meta: Meta = Meta.initial
  private _products: CollectionModel<number, ProductTypeModel> =
    getInitialCollectionModel()
  private _hasMore: boolean = true
  private _limit: number = 3
  private _total: number = 0

  private _ctgMeta: Meta = Meta.initial
  private _categories: optionType[] = []
  private _filter: optionType [] = []


  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _meta: observable,
      _ctgMeta: observable,
      _products: observable,
      _hasMore: observable,
      _limit: observable,
      _total: observable,
      _categories: observable,
      _filter: observable,
      // computed - получаем в компонентах
      meta: computed,
      ctgMeta: computed,
      products: computed,
      hasMore: computed,
      limit: computed,
      total: computed,
      categories: computed,
      filter: computed,
      //actions - менять observable (переменные внутри стора)
      getProducts: action.bound,
      fetchMore: action.bound,
      toggleHasMore: action.bound,

      setFilter: action.bound,
      fetchCategories: action.bound,

      //reactions
    })
  }

  get meta(): Meta {
    return this._meta

  }

  get ctgMeta(): Meta {
    return this._ctgMeta

  }

  get products(): ProductTypeModel[] {
    return linearizeCollection(this._products)
  }

  get hasMore(): boolean {
    return this._hasMore
  }

  get limit(): number {
    return this._limit
  }

  get total(): number {
    return this._total
  }

  get categories(): optionType[] {
    return this._categories
  }

  get filter(): optionType[] {
    return this._filter
  }

  toggleHasMore(value: boolean) {
    this._hasMore = value
  }

  async fetchMore() {
    if (!this._hasMore) return
    this._limit += 1 //потом исправить на 3 когда не будет по 10 перерендеров
    await this.getProducts().then(() => {
      runInAction(() => {
        this._hasMore = this._total >= this._limit
      })
    })
  }

  async fetchCategories() {
    this._ctgMeta = Meta.loading;
    const response = await getCategories()
      runInAction(() => {
        this._categories = [];
        this._categories = response.data.map((value: string, key: number) => {
          this._categories.push({value: value, key: key.toString()})
        })
        this._ctgMeta = Meta.success
      })
  }

  setFilter(categories: optionType[]){
    this._filter = [];
    this._filter = [...categories];
  }

  filterProduct = (): void => {
    if (this.filter.length !== 0) {
      console.log("filter", this._filter.length)
      const categories: string[] = [];
      this.filter.map(item =>{
        categories.push(item.value)
      })
      const filteredItems = linearizeCollection(this._products).filter(
        (product) =>
          categories.includes(product.category)
      )
      this._products = normalizeCollection(
        filteredItems,
        (listItem: { id: any }) => listItem.id
      )
    } else {
      console.log("no filter")
      this.getProducts()
    }

  }

  async getProducts() {
    this._meta = Meta.loading
    try {
      const response = await getProductList()
      runInAction(() => {
        if (!response.data) {
          this._meta = Meta.error
          this._products = getInitialCollectionModel()
        } else {
          const list: ProductTypeModel[] = []
          this._total = response.data.length
          //list = response.data.map(normalizeProductType) - если без break
          for (const item of response.data) {
            list.push(normalizeProductType(item))
            if (list.length > this._limit) {
              break
            }
          }
          this._meta = Meta.success
          this._products = normalizeCollection(
            list,
            (listItem: { id: any }) => listItem.id
          )
          if (rootStore.query.getParam('search')) {
            this.searchProduct()
          }

          if (this.filter.length !== 0) {
            this.filterProduct()
          }

          return
        }
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._products = getInitialCollectionModel()
      })
    }
  }

  searchProduct = (): void => {
    let searchTerm = rootStore.query.getParam('search')
    if (searchTerm) {
      const filteredItems = linearizeCollection(this._products).filter(
        //т.к. выше if (searchTerm), код не выполнится если серчтерм undefined
        (product) =>
          product.title
            .toLowerCase()
            // @ts-ignore
            .includes(searchTerm.toString().toLowerCase())
      )
      this._products = normalizeCollection(
        filteredItems,
        (listItem: { id: any }) => listItem.id
      )
    } else {
      this.getProducts()
    }
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    // eslint-disable-next-line no-console
    (search) => {
      // eslint-disable-next-line no-console
      console.log('search value changed: ', search)
    }
    //здесь бы вставить функцию которая отгружает серч
  )


  destroy() {
    this._qpReaction()

  }
}
