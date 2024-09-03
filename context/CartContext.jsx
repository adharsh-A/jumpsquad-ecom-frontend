    // CartContext.js
    import React, { createContext, useState } from 'react';
    import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

    export const CartContext = createContext();

    export const CartProvider = ({ children }) => {

        const [items,setItems]=useState([]);
    const [cartItems, setCartItems] = useState([]);

    const addItems = (item) => {
        setItems(item);
    };

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);

            if (existingItem) {
                toast.success(`${item.title} quantity updated!`, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { 
                            ...cartItem, 
                            quantity: Math.max(cartItem.quantity + item.quantity, 1) 
                        }
                        : cartItem
                );
            } else {
                toast.success(`${item.title} added to cart!`, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                return [...prevItems, item];
            }
        });
    };

    
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };


    return (
        <CartContext.Provider value={{ cartItems, addToCart, addItems,items,calculateTotalPrice }}>
        {children}
        </CartContext.Provider>
    );
    };
