import React from "react";

import Header from "@components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProductDetail from "./Pages/ProductDetail";
import Products from "./Pages/Products";

const App = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  );
};

export default App;
