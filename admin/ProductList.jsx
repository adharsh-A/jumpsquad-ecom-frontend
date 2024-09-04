// ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  return (
    <>
      <div>
        <ProductForm/>
      </div>
    </>
  );
};

export default ProductList;
