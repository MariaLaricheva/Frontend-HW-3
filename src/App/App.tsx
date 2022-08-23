import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import ProductDetail from "./Pages/ProductDetail";
import Products from "./Pages/Products";


const App = () => {


  return (
    <div className="App">
      <BrowserRouter>
          <Header/>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
