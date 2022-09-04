import axios from "axios";

import ProductType from "../models/productType";

const API = axios.create({
  baseURL: "https://fakestoreapi.com/"
})

export const getProductList = () => API.get<ProductType[]>(`products`);
export const getProduct = (id: number | string) => API.get<ProductType>(`products/${id}`);
export const getCategories = () => API.get(`products/categories`);
export const getProductByCategory = (category: string) => API.get(`products/categories/${category}`);
export const getProductWithLimit = (limit: number) => API.get(`products?limit=${limit}`);


