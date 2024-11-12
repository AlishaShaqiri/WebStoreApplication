import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import for Routes and Route
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
