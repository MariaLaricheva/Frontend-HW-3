import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection
} from 'models/shared/collectionModel';
import { normalizeProductType, ProductTypeModel } from 'store/models';
import { getProductList } from 'utils/fetchApi'
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import rootStore from "../RootStore/instance"

type PrivateFields = "_meta" | "_products" | "_hasMore" | "_limit" | "_total";

/* если нужен - добавить в имплемент после айЛокалСтор
export interface IProductStore {
  getProducts: () => Promise<void>
}
 */

export default class ProductStore implements ILocalStore{
  private _meta: Meta = Meta.initial;
  private _products: CollectionModel<number, ProductTypeModel> = getInitialCollectionModel();
  private _hasMore: boolean = true;
  private _limit: number = 3;
  private _total: number = 0;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _meta: observable,
      _products: observable,
      _hasMore: observable,
      _limit: observable,
      _total: observable,
      // computed - получаем в компонентах
      meta: computed,
      products: computed,
      hasMore: computed,
      limit: computed,
      total: computed,
      //actions - менять observable (переменные внутри стора)
      getProducts: action.bound,
      fetchMore: action.bound,
      toggleHasMore: action.bound
      //reactions
    })
  }

  get meta(): Meta{
    return this._meta;
  }

  get products(): ProductTypeModel[]{
    return linearizeCollection(this._products);
  }

  get hasMore(): boolean{
    return this._hasMore;
  }

  get limit(): number{
    return this._limit;
  }

  get total(): number{
    return this._total;
  }

  toggleHasMore(value: boolean){
    this._hasMore = value;
  }

  async fetchMore(){
    if (!this._hasMore)
      return;
      this._limit+= 1; //потом исправить на 3 когда не будет по 10 перерендеров
      await this.getProducts().then(() => {
        runInAction(() => {
          this._hasMore = this._total >= this._limit;
        })
      });
  }

  async getProducts(){
    this._meta = Meta.loading;
    try {
      const response = await getProductList();
      runInAction(() => {
          if (!response.data){
            this._meta = Meta.error;
            this._products = getInitialCollectionModel();
          }
          else {
            const list: ProductTypeModel[] = [];
            this._total = response.data.length;
            //list = response.data.map(normalizeProductType) - если без break
            for (const item of response.data){
              list.push(normalizeProductType(item))
              if (list.length > this._limit)
              { break }
            }
            this._meta = Meta.success;
            this._products = normalizeCollection(list, ((listItem: { id: any; }) => listItem.id));
            if (rootStore.query.getParam('search')){
              this.searchProduct();
            }
            return;
          }

        }
      )
    }
    catch (error){
      runInAction(() => {
        this._meta = Meta.error;
        this._products = getInitialCollectionModel();
      })
    }
  }

  destroy() {
    this._qpReaction()
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('search'),
    // eslint-disable-next-line no-console
    (search) => {console.log("search value changed: ", search)}
    //здесь бы вставить функцию которая отгружает серч
  )

  searchProduct = (): void => {
    let searchTerm = rootStore.query.getParam('search');
    if (searchTerm) {
      const filteredItems = linearizeCollection(this._products).filter(
          //т.к. выше if (searchterm), код не выполнится если серчтерм undefined
          // @ts-ignore
          product => product.title.toLowerCase().includes(searchTerm.toString().toLowerCase())
      )
      this._products = normalizeCollection(filteredItems, ((listItem: { id: any; }) => listItem.id));
      }
    else {
      this.getProducts();
    }
  }
};