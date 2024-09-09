// CartContext.js
import React, { createContext, useContext, useState,useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSaveCart from "../hooks/cart-hook.js";
import { AuthContext } from "./auth-context.js";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId,isLoggedIn } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { isSaving, saveError, saveSuccess, saveCart } = useSaveCart();

  const addItems = (item) => {
    setItems(item);
  };

  const addToCart = (item) => {
    if (!item.id) {
      toast.error("Item is missing ID");
      console.error("Item is missing product ID:", item);
      return;
    }
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
  
      if (existingItem) {
        // Merge and update the quantity
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      } else {
        // Add new item to the cart
        return [...prevItems, { ...item, quantity: Math.max(item.quantity, 1) }];
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
        if (isLoggedIn) {
          try {
            let domainName;
            if(process.env.NODE_ENV === "production"){
               domainName = `https://jumpsquad-backend.vercel.app`;
              }else{
              domainName = import.meta.env.VITE_API_URL;
              }
            const payload = { userId };
            const response = await axios.post(`${domainName}/api/cart/get-cart`,payload
            ); // Replace with your API endpoint
            const fetchedItems = response.data.items || []; // Assuming the response is an array of items
            console.log(fetchedItems);
            
            setCartItems(fetchedItems); // Store fetched items in cartItems state
            toast.success(`Cart fetched successfully`,{
              position:"bottom-right"
            }
              
            );
          } catch (error) {
            toast.error(`Error fetching cart items: `,{
              position:"bottom-right"
            });
          }
          
        }
      }
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
      price: item.price
    }));

    if (filteredCartItems.length > 0 && totalPrice >= 0 && userId) {
      saveCart(filteredCartItems, totalPrice, userId)
       
    }
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, addItems, items, calculateTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
