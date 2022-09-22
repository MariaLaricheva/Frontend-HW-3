import { ILocalStore } from 'utils/useLocalStore'
import { Meta } from 'utils/meta'
import { ProductTypeModel } from 'store/models'
import { CollectionModel, getInitialCollectionModel, linearizeCollection } from 'models/shared/collectionModel'
import { action, computed, makeObservable, observable } from 'mobx'
import { cartItemType } from 'models/cartItemType'

type PrivateFields =
  | '_cartItems'


/* если нужен - добавить в имплемент после айЛокалСтор
export interface IProductDetailStore {
  getProductDetailByID: (id: string | number) => Promise<void>
}
 */

export default class CartStore implements ILocalStore {
  private _meta: Meta = Meta.initial
  private _product: ProductTypeModel | null = null
  private _cartItems: cartItemType[] =
    []
  private _category = ''

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _cartItems: observable,
      // computed - получаем в компонентах
      cartItems: computed,
      sum: computed,
      length: computed,
      //actions - менять observable (переменные внутри стора)
      addItem: action.bound,
    })
  }

  get sum () {
    let sum = 0;
    this._cartItems.map(item => sum+=item.product.price*item.quantity)
    return sum.toFixed(2);
  }

  get length () {
    return this._cartItems.length;
  }

  get cartItems () {
    return this._cartItems
  }

  addItem(item: ProductTypeModel){
    let isThereAnItem = false;
    this._cartItems.map((product, index) => {
      if (product.product.id === item.id){
        product.quantity++
        isThereAnItem = true
      }
    })
    if (!isThereAnItem) {
      this._cartItems.push({product: item, quantity: 1})
    }
  }

  increaseQuantity(item: ProductTypeModel){
    this._cartItems.map((product, index) => {
      if (product.product.id === item.id){
        product.quantity++
      }
    })
  }

  decreaseQuantity(item: ProductTypeModel){
    this._cartItems.map((product, index) => {
      if (product.product.id === item.id){
        if (product.quantity === 1) {
          this._cartItems.splice(index, 1)
        }
        else {
          product.quantity--
        }
      }
    })
  }

  deleteItem(item: ProductTypeModel){
    this._cartItems.map((product, index) => {
      if (product.product.id === item.id){
          this._cartItems.splice(index, 1)
      }
    })
  }

  destroy(){

  }
}