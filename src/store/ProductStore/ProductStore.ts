import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import { getProductWithLimit } from "../../api/fetchApi";
import { normalizeProductType, ProductTypeApi } from "../models";
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection
} from "../models/shared/collectionModel";
import rootStore from "../RootStore/instance"


type PrivateFields = "_meta" | "_products" | "_hasMore" | "_limit";

export interface IProductStore {
  getProducts: () => Promise<void>
}

export default class ProductStore implements ILocalStore, IProductStore{
  private _meta: Meta = Meta.initial;
  private _products: CollectionModel<number, ProductTypeApi> = getInitialCollectionModel();
  private _hasMore: boolean = true;
  private _limit: number = 3;

  constructor() {
    makeObservable<ProductStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _meta: observable,
      _products: observable,
      _hasMore: observable,
      _limit: observable,
      // computed - получаем в компонентах
      meta: computed,
      products: computed,
      hasMore: computed,
      limit: computed,
      //actions - менять observable (переменные внутри стора)
      getProducts: action.bound,
      fetchMore: action.bound,

      //reactions
    })
  }

  get meta(): Meta{
    return this._meta;
  }

  get products(): ProductTypeApi[]{
    return linearizeCollection(this._products);
  }

  get hasMore(): boolean{
    return this._hasMore;
  }

  get limit(): number{
    return this._limit;
  }

  fetchMore(){
    if (this.hasMore)
    {this._limit = this._limit + 3;}
    this.getProducts().then(() => {
      if (this._products.order.length <= this.limit)
      {
        this._hasMore = false;
      }});
  }

  async getProducts(){
    this._meta = Meta.loading;
    try {
      const response = await getProductWithLimit(this._limit);
      runInAction(() => {
          if (response.data.length < this._limit) {
            this._hasMore = false;
          }
          const list: ProductTypeApi[] = [];
          for (const item of response.data){
            list.push(normalizeProductType(item))
          };
          this._meta = Meta.success;
          this._products = normalizeCollection(list, (listItem => listItem.id));
          if (rootStore.query.getParam('search')){
            this.searchProduct();
          };
          return;
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
    //
  }

  private readonly _qpReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParam('_search'), //было просто "серч"
    // eslint-disable-next-line no-console
    (search) => {console.log("search value changed: ", search)}
    //здесь бы вставить функцию которая отгружает серч
  )


  searchProduct = (): void => {
    let searchTerm = rootStore.query.getParam('search');
    // eslint-disable-next-line no-console
    console.log("searchTerm", searchTerm);
    // eslint-disable-next-line no-console
    console.log("поиск по строке", rootStore.query.getParam('search'));
      if (searchTerm) {
        const filteredItems = linearizeCollection(this._products).filter(
          // @ts-ignore
          product => product.title.includes(searchTerm.toString())
        )
      this._products = normalizeCollection(filteredItems, (listItem => listItem.id));
        // eslint-disable-next-line no-console
        console.log("поиск сделан", searchTerm);
      }
      else {
        // eslint-disable-next-line no-console
        console.log("поиска нет", searchTerm);
        this.getProducts();
      }
    }
};