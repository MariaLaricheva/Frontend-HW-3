import { ILocalStore } from 'utils/useLocalStore'
import { Meta } from 'utils/meta'
import { ProductTypeModel } from 'store/models'
import { CollectionModel, getInitialCollectionModel } from 'models/shared/collectionModel'
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
  private _cartItems: CollectionModel<number, cartItemType> =
    getInitialCollectionModel()
  private _category = ''

  constructor() {
    makeObservable<CartStore, PrivateFields>(this, {
      // observable - отслеживаем внутри стора
      _cartItems: observable,
      // computed - получаем в компонентах
      cartItems: computed,
      sum: computed,
      //actions - менять observable (переменные внутри стора)




    })
  }

  get sum () {
    return 0;
  }

  get cartItems () {
    return this._cartItems
  }

  destroy() {}
}