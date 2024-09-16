// CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSaveCart from "../hooks/cart-hook.js";
import useWishlist from "../hooks/wishlist-hook.js";
import { AuthContext } from "./auth-context.js";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { saveCart } = useSaveCart();
  const { saveWishlist } = useWishlist();

  const addItems = (item) => {
    setItems(item);
  };
  const setWishlistItems = (items) => {
    setWishlist(items);
  };

  //adding wishlist when wishlist frontend gets updated
  useEffect(() => {}, [wishlist]);
  //add to wishlist frontend
  const addToWishlist = (item) => {
    if (!item.id) {
      toast.error("Item is missing ID");
      console.error("Item is missing product ID:", item);
      return;
    }

    setWishlist((prevItems = []) => {
      // Check if the item already exists in the wishlist
      const existingItem = prevItems.find(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (existingItem) {
        // Item already exists in the wishlist
        toast.error("Item already in wishlist", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return prevItems;
      } else {
        // Item does not exist, add it to the wishlist
        toast.success("Item added to wishlist", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return [...prevItems, item]; // Add full item instead of just `item.id`
      }
    });
    const filteredWishlistItems = wishlist.map((item) => ({
      productId: item.id || item.productId,
      title: item.title,
      image: item.image,
      price: item.price,
    }));
    toast(filteredWishlistItems);
    saveWishlist(userId, filteredWishlistItems);
  };
  //cart remove
  const removeItems = (id) => {
    setCartItems((item) => {
      return item.filter((cartItem) => cartItem.id !== id);
    });
  };
  //cart add
  const addToCart = (item) => {
    if (!item.id) {
      toast.error("Item is missing ID");
      console.error("Item is missing product ID:", item);
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        toast.success("Item added to cart", {
          position: "bottom-right",
          autoClose: 1000,
        })
        // Merge and update the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.max(cartItem.quantity + item.quantity, 1),
              }
            : cartItem
        );
      } else {
        toast.success("Item added to cart", {
          position: "bottom-right",
          autoClose: 1000,
        })
        // Add new item to the cart
        return [
          ...prevItems,
          { ...item, quantity: Math.max(item.quantity, 1) },
        ];
      }
    });
  };

  const calculateTotalPrice = (items = []) => {
    const subtotal = items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const shipping = 99; // Add shipping or tax (one-time)
    return subtotal + shipping;
  };

  // Fetch cart items from an API
  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          let domainName;
          if (process.env.NODE_ENV === "production") {
            domainName = `https://jumpsquad-backend.vercel.app`;
          } else {
            domainName = import.meta.env.VITE_API_URL;
          }
          const payload = { userId };
          const response = await axios.post(
            `${domainName}/api/cart/get-cart`,
            payload
          ); // Replace with your API endpoint
          const fetchedItems = response.data.items || []; // Assuming the response is an array of items

          setCartItems(fetchedItems); // Store fetched items in cartItems state
        } catch (error) {
          toast.error(`Error fetching cart items: `, {
            position: "bottom-right",
          });
        }
      }
    };
    fetchCartItems(); // Call the fetch function
  }, [userId]);

  // Use useEffect to save the cart whenever cartItems change
  useEffect(() => {
    const totalPrice = calculateTotalPrice(cartItems);

    const filteredCartItems = cartItems.map((item) => ({
      productId: item.id,
      title: item.title,
      image: item.image,
      quantity: item.quantity,
      price: item.price,
    }));

    if (userId) {
      saveCart(filteredCartItems, totalPrice, userId);
    }
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        addItems,
        setCartItems,
        items,
        calculateTotalPrice,
        removeItems,
        addToWishlist,
        wishlist,
        setWishlistItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
