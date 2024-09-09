import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductList from "./UI/ProductList";
import Loading from "../components/UI/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import About from "../components/About";
import { CartContext } from "../context/CartContext";

const Products = (props) => {
  const { addItems, items } = useContext(CartContext); // Accessing CartContext
  const [loading, setLoading] = useState(false);

  const domainName = import.meta.env.VITE_API_URL; // Getting API URL from environment

  useEffect(() => {
    if (items.length === 0) {
      setLoading(true); // Start loading before fetching data
      axios
        .get(`${domainName}/api/products/all`)
        .then((response) => {
          if (response.data && response.data.products) {
            addItems(response.data.products); // Assuming `response.data.products` exists
          } else {
            toast.error("Unexpected response structure from server.");
          }
          setLoading(false); // Stop loading after fetching data
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data:", error);
          toast.error(`Error: ${error.message || "Network response was not ok"}`, {
            position: "bottom-right",
            autoClose: 2000,
          });
        });
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading /> // Show loading while fetching data
      ) : (
        <>
          <Hero />
          <ProductList /> {/* Make sure ProductList properly renders the items */}
          <About />
        </>
      )}
    </>
  );
};

export default Products;
