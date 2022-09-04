import React, { createContext, useContext } from "react";

import { useLocalStore } from "@utils/useLocalStore";

import ProductDetailStore from "../store/ProductDetailStore/ProductDetailStore";
import ProductStore from "../store/ProductStore";


type StoreContextType = {
  productStore: ProductStore,
  productDetailStore: ProductDetailStore
}

type StoreProviderType = {
  children: React.ReactNode;
}

const StoreContext = createContext< StoreContextType | null >(null)

export const StoreProvider: React.FC<StoreProviderType> = ({children}) => {

  const productStore = useLocalStore(() => new ProductStore());
  const productDetailStore = useLocalStore(() => new ProductDetailStore());
  return (
    <StoreContext.Provider value={{ productStore, productDetailStore }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useRootStore = () => {
  const context = useContext(StoreContext);

  if (!context){
    throw new Error("context is empty")
  }

  return context;

}