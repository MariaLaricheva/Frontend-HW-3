import { normalizeProductType, ProductTypeApi, ProductTypeModel } from 'models/productType'

export type CartTypeApi = {
  id: string
  userId: string
  date: string,
  products: ProductTypeApi[]
}

export type CartTypeModel = {
  id: string
  userId: string
  date: string,
  products: ProductTypeModel[]
}

export const normalizeCartType = (from: CartTypeApi): CartTypeModel => ({
  id: from.id,
  userId: from.userId,
  date: from.date,
  products: from.products.map(item => normalizeProductType(item))
})