import { normalizeProductType, ProductTypeModel } from 'models/productType';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection
} from 'models/shared/collectionModel';
import { getProduct, getProductByCategory } from "utils/fetchApi";
import { Meta } from "utils/meta";
import { ILocalStore } from "utils/useLocalStore";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

type PrivateFields = "_meta" | "_product" | "_relatedItems" | "_category" | "_relItemsMeta" ;

/* если нужен - добавить в имплемент после айЛокалСтор
export interface IProductDetailStore {
  getProductDetailByID: (id: string | number) => Promise<void>
}
 */

export default class ProductDetailStore implements ILocalStore{
  private _meta: Meta = Meta.initial;
  private _product: ProductTypeModel | null = null;
  private _relatedItems: CollectionModel<number, ProductTypeModel> = getInitialCollectionModel();
  private _relItemsMeta: Meta = Meta.initial;
  private _category = "";

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
      category: computed,
      relatedItems: computed,
      relItemsMeta: computed,
      //actions - менять observable (переменные внутри стора)
      getRelatedItems: action.bound,
      getProductDetailByID: action.bound, //если функция стрелочная - можно не прописывать bound
    })
  }

  get meta(): Meta{
    return this._meta;
  }

  get product(): ProductTypeModel | null {
    return this._product;
  }

  get relatedItems(): ProductTypeModel[] {
    return linearizeCollection(this._relatedItems);
  }

  get relItemsMeta(): Meta {
    return this._relItemsMeta;
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
      if (!response.data){
        this._meta = Meta.error;
        this._product = null;
      }
      else {
        runInAction(() => {
          this._meta = Meta.success;
          this._product = response.data;
          this._category = response.data.category;
          this.getRelatedItems();
        })
      }
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
        if (!response.data){
          this._relItemsMeta = Meta.error;
          this._relatedItems = getInitialCollectionModel();
        }
        else {
          const list: ProductTypeModel[] = [];
          //list = response.data.map(normalizeProductType) - если без break
          for (const item of response.data){
            list.push(normalizeProductType(item))
            if (list.length >= 3) { break }
          }
          this._relItemsMeta = Meta.success;
          this._relatedItems = normalizeCollection(list, (listItem: { id: any; }) => listItem.id);
          return;
        }
      })
    }
    catch (error){
      runInAction(() => {
        this._relItemsMeta = Meta.error;
        this._relatedItems = getInitialCollectionModel();
      })
    }
  }


  destroy() {

  }
}