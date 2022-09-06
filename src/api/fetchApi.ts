import axios from "axios";

import { ProductTypeApi } from "../store/models/productType";

const API = axios.create({
  baseURL: "https://fakestoreapi.com/"
})

export const getProductList = () => API.get<ProductTypeApi[]>(`products`);
export const getProduct = (id: number | string) => API.get<ProductTypeApi>(`products/${id}`);
export const getCategories = () => API.get(`products/categories`);
export const getProductByCategory = (category: string) => API.get(`products/category/${category}`);
export const getProductWithLimit = (limit: number) => API.get(`products?limit=${limit}`);


