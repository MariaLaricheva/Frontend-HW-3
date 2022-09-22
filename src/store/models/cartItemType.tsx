import { ProductTypeModel } from 'models/productType'

export type cartItemType = {
  product: ProductTypeModel,
  quantity: number
}