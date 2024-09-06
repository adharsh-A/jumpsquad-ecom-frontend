// CartContext.js
import React, { createContext, useContext, useState,useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSaveCart from "../hooks/cart-hook.js";
import { AuthContext } from "../context/auth-context.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { userId } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { isSaving, saveError, saveSuccess, saveCart } = useSaveCart();

  const addItems = (item) => {
    setItems(item);
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: Math.max(cartItem.quantity + item.quantity, 1),
              }
            : cartItem
        );
      } else {
        return [...prevItems, item];
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

  // Use useEffect to save the cart whenever cartItems change
  useEffect(() => {
    const totalPrice = calculateTotalPrice(cartItems);
    
    const filteredCartItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    if (filteredCartItems.length > 0 && totalPrice >= 0 && userId) {
      saveCart(filteredCartItems, totalPrice, userId)
        .then(() => {
          toast.success(`Cart saved successfully! Total price: ${totalPrice}`);
        })
        .catch((error) => {
          toast.error(`Error saving cart: ${error.message}`);
        });
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
