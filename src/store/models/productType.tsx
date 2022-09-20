export type ProductTypeApi = {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  title: string
}

export type ProductTypeModel = {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  title: string
}

export const normalizeProductType = (
  from: ProductTypeApi
): ProductTypeModel => ({
  category: from.category,
  description: from.description,
  id: from.id,
  image: from.image,
  price: from.price,
  rating: {
    rate: from.rating.rate,
    count: from.rating.count,
  },
  title: from.title,
})
