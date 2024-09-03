import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductList from "./UI/ProductList";
import Loading from "../components/UI/Loading";
import { toast } from "react-toastify";
import axios from "axios";

import { CartContext } from "../context/CartContext";

const Products = (props) => {
  const { addItems, items } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState([]);

  let localhost;
  if (process.env.NODE_ENV === "production") {
    localhost = `https://jumpsquad-backend.vercel.app`;
  } else {
    localhost = `http://localhost:5000`;
  }

  useEffect(() => {
    axios
      .get(`${localhost}/api/products/all`, { timeout: 5000 })
      .then((response) => {
        addItems(response.data.products); // Assuming `response.data` contains the products
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
        toast.error(`Network response was not ok`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Hero />
          <ProductList />
        </>
      )}
    </>
  );
};

export default Products;
