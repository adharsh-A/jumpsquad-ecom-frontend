import React, { useContext, useEffect, useState } from "react";
import Hero from "../components/Hero";
import ProductList from "./UI/ProductList";
import Loading from "../components/UI/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import About from "../components/About";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/auth-context";

const Products = () => {
  const { addItems, items, setWishlistItems } = useContext(CartContext); // Accessing CartContext
  const [loading, setLoading] = useState(false);
  const { userId } = useContext(AuthContext);
  // toast.warn(`${userId}`);
  useEffect(() => {
    const fetchWishlist = async () => {
      let domainName;

      if (process.env.NODE_ENV === "production") {
        domainName = `https://jumpsquad-backend.vercel.app`;
      } else {
        domainName = import.meta.env.VITE_API_URL;
      }

      if (userId) {

        try {
          const response = await axios.post(
            `${domainName}/api/wishlist/get-wishlist`,
            {
              id: userId,
            }
          );

          
          const itemsData = response.data.items;
          const fetchedItems = itemsData.map((item) => ({
            id: item.productId,
            title: item.title,
            image: item.image,
            price: item.price,
          }));
          setWishlistItems(fetchedItems);
          // toast("got hit");

          // Display the number of fetched items
        } catch (error) {
        }
      }
    };

    // Call the async function inside useEffect
    fetchWishlist();
  }, []);

  let domainName;
  if (process.env.NODE_ENV === "production") {
    domainName = `https://jumpsquad-backend.vercel.app`;
  } else {
    domainName = import.meta.env.VITE_API_URL;
  }
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
          toast.error(
            `Error: ${error.message || "Network response was not ok"}`,
            {
              position: "bottom-right",
              autoClose: 2000,
            }
          );
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
          <ProductList />
          <About />
        </>
      )}
    </>
  );
};

export default Products;
