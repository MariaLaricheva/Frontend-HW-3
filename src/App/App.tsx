import React from 'react'
import Header from 'components/Header'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider } from "../context/StoreContext";

import ProductDetail from 'pages/ProductDetail'
import Products from 'pages/Products'
import About from 'pages/About'
import Services from 'pages/Services'
import Article from 'pages/Articles'
import Registration from 'pages/Registration'
import Login from 'pages/Login'
import User from 'pages/User'
import Account from 'pages/Account'

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product">
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/article" element={<Article />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
