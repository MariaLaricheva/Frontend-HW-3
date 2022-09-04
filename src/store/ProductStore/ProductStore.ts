import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

import { getProductWithLimit } from "../../api/fetchApi";
import ProductType from "../../models/productType";

type PrivateFields = "_meta" | "_products" | "_hasMore" | "_limit";

export interface IProductStore {
  getProducts: () => Promise<void>
}

export default class ProductStore implements ILocalStore, IProductStore{
  private _meta: Meta = Meta.initial;
  private _products: ProductType[] = [];
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
      fetchMore: action.bound
    })
  }

  get meta(): Meta{
    return this._meta;
  }

  get products(): ProductType[]{
    return this._products;
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
    this.getProducts();
    if (this._products.length <= this.limit)
    {
      this._hasMore = false;
    }
  }

  async getProducts(){
    this._meta = Meta.loading;
    try {
      const response = await getProductWithLimit(this._limit);
      runInAction(() => {
          if (response.data.length < this._limit) {
            this._hasMore = false;
          }
          this._meta = Meta.success;
          this._products = [...response.data];
        }
      )
    }
    catch (error){
      runInAction(() => {
        this._meta = Meta.error;
        this._products = [...[]];
      })
    }
  }

  destroy() {
    //устрой дестрой порядок это отстой
  }
};