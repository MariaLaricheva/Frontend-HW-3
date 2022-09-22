import React, { createContext, useContext } from "react";

import { useLocalStore } from "utils/useLocalStore";

import UserStore from "store/UserStore";
import CartStore from "store/CartStore";


type StoreContextType = {
  userStore: UserStore,
  cartStore: CartStore
}

type StoreProviderType = {
  children: React.ReactNode;
}

const StoreContext = createContext< StoreContextType | null >(null)

export const StoreProvider: React.FC<StoreProviderType> = ({children}) => {

  const userStore = useLocalStore(() => new UserStore());
  const cartStore = useLocalStore(() => new CartStore());
  return (
    <StoreContext.Provider value={{ userStore, cartStore }}>
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