// ProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  let localhost;
  if(process.env.NODE_ENV === 'production'){
    localhost = `${process.env.Link}`;
  }else{
    localhost = `http://localhost:5000`;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${localhost}/api/products/all`, { timeout: 5000 }
        );
        setProducts(response.data.products);
        console.log(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);



  return (
    <>
      <div>
        <ProductForm/>
      </div>
    </>
  );
};

export default ProductList;
