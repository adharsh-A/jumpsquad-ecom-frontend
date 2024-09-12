import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./ProductList.css";
import ProductForm from "./ProductForm.jsx";
import MenuItems from "./pages/MenuItems.jsx";
import AllProducts from "./pages/AllProducts.jsx"; // Assuming these components exist
import Orders from "./pages/Orders"; // You can create them as per your need
import Users from "./pages/Users";

const ProductList = () => {

  // Sidebar (Dashboard) Menu


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <MenuItems />
      </aside>

      {/* Content Area */}
      <main className="content-area">
        <Routes>
          <Route path="/admin/add" element={<ProductForm />} />
          <Route path="/admin/product/update" element={<ProductForm />} />
          <Route path="/admin/products" element={<AllProducts />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
};

export default ProductList;
