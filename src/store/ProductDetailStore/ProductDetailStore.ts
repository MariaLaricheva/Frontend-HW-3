import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

import { getProduct, getProductByCategory } from "../../api/fetchApi";
import ProductType from "../../models/productType";

type PrivateFields = "_meta" | "_product" | "_relatedItems" | "_category" | "_relItemsMeta" ;

export interface IProductDetailStore {
  getProductDetailByID: (id: string | number) => Promise<void>
}

export default class ProductDetailStore implements ILocalStore, IProductDetailStore{
  private _meta: Meta = Meta.initial;
  private _product: ProductType | null = null;
  private _id: number | null = null;
  private _relatedItems: ProductType[] = [];
  private _relItemsMeta: Meta = Meta.initial;
  private _category: string = "";

  constructor() {
    makeObservable<ProductDetailStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _category: observable,
      _meta: observable,
      _relItemsMeta: observable,
      _product: observable,
      _relatedItems: observable,
      // computed - получаем в компонентах
      meta: computed,
      product: computed,
      id: computed,
      category: computed,
      relatedItems: computed,
      relItemsMeta: computed,
      //actions - менять observable (переменные внутри стора)
      getRelatedItems: action.bound,
      getProductDetailByID: action.bound,
    })
  }

  get meta(): Meta{
    return this._meta;
  }

  get product(): ProductType | null {
    return this._product;
  }

  get relatedItems(): ProductType[] {
    return this._relatedItems;
  }

  get relItemsMeta(): Meta {
    return this._relItemsMeta;
  }

  get id(): number | null {
    if (this.product) {
      return this.product.id;
    }
    else {return null}
  }

  get category(): string | null{
    if (this.product) {
      return this.product.category;
    }
    else {return null}
  }

  async getProductDetailByID(id: string | number){
    this._meta = Meta.loading;
    try {
      const response = await getProduct(id);
      runInAction(() => {
          this._meta = Meta.success;
          this._product = response.data;
          this._id = response.data.id;
          this._category = response.data.category;
        }
      )
    }
    catch (error){
      runInAction(() => {
        this._meta = Meta.error;
        this._product = null;
      })
    }
  }

  async getRelatedItems(){
    this._relItemsMeta = Meta.loading;
    try {
      const response = await getProductByCategory(this._category);
      runInAction(() => {
          this._relItemsMeta = Meta.success;
          this._product = response.data;
        }
      )
    }
    catch (error){
      runInAction(() => {
        this._relItemsMeta = Meta.error;
        this._product = null;
      })
    }
  }


  destroy() {
    //устрой дестрой порядок это отстой
  }
}