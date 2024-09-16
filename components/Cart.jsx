import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import CartItem from "./UI/CartItem";
import Modal from "./UI/Modal";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from "axios";
import PayPalModal from "./UI/PaypalModal";
import { toast } from "react-toastify";
import { user } from "fontawesome";
import { AuthContext } from "../context/auth-context";
import mongoose from "mongoose";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate=useNavigate()
  const { userId } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const {
    cartItems,
    addToCart,
    calculateTotalPrice,
    removeItems,
    setCartItems,
  } = useContext(CartContext);
  const totalPrice = calculateTotalPrice(cartItems);
  const deliveryFee = 99;

  const subQuantity = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, quantity: -1 });
  };

  const addQuantity = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, quantity: +1 });
  };

  const removeItemsFromCart = (e, id) => {
    e.preventDefault();
    removeItems(id);
  };

  const productsForCart = cartItems.map((item) => (
    <CartItem
      item={item}
      key={item.id}
      id={item.id}
      title={item.title}
      image={item.image}
      price={item.price}
      subQuantity={subQuantity}
      addQuantity={addQuantity}
      removeItems={removeItemsFromCart}
      quantity={item.quantity}
    />
  ));

  const openCheckOut = () => {
    // const checkoutData = `Total Price: ₹${price}`;
    // setCheckoutData(checkoutData);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleApprove = async (orderID) => {
    closeModal();

    try {
      let checkoutData = [];
      checkoutData = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        image: item.image,
        title: item.title,
        price: item.price,
      }));

      const orderData = {
        userId,
        items: checkoutData,
        totalAmount: totalPrice,
        orderID,
      };
      // orderData.items = orderData.items.map((item) => ({
      //   ...item,
      //   productId: mongoose.Types.ObjectId(item.productId),
      // }));

      let domainName;
      if (process.env.NODE_ENV === "production") {
        domainName = "https://jumpsquad-backend.vercel.app";
      } else {
        domainName = import.meta.env.VITE_API_URL;
      }

      const response = await axios.post(
        `${domainName}/api/orders/create-order`,
        orderData
      );

      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      setOpen(false);
      toast.error("Error saving order", {
        autoClose: 500,
      });
      console.error("Error saving order:", error);
    }
    try {
      let domainName;
      if (process.env.NODE_ENV === "production") {
        domainName = "https://jumpsquad-backend.vercel.app";
      } else {
        domainName = import.meta.env.VITE_API_URL;
      }
      const verifyResponse = await axios.get(
        `${domainName}/api/orders/paypal/verify-payment/${orderID}`
      );
      if (verifyResponse.status === 200) {
        toast.success("payment verified successfully",{
          autoClose: 1000,
          position: "bottom-right",
        });
        toast("order placed successfully", {
          autoClose: 1000,
          position: "bottom-right",
      })
        setCartItems([]);
        navigate("/");
      } else if (verifyResponse.status === 400) {
        toast.error("payment not completed", {
          autoClose: 1000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Error verifying payment", {
        autoClose: 1000, position: "bottom-right",
      });
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="master-container">
        <div className="card-cart cart">
          <label className="title">
            {cartItems ? "Your Cart" : "Empty Cart"}
          </label>
          <div className="products">{productsForCart}</div>
        </div>

        {cartItems.length > 0 && (
          <div className="card-cart checkout">
            <label className="title">Checkout</label>
            <div className="details">
              <span>Your cart subtotal:</span>
              <span>₹{totalPrice}</span>

              <span>Shipping fees:</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="checkout--footer">
              <label className="price">
                <sup>₹</sup>
                {totalPrice}
              </label>

              <button className="checkout-btn" onClick={openCheckOut}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <PayPalModal
        isOpen={open}
        onClose={closeModal}
        amount={totalPrice}
        onApprove={handleApprove}
      />
    </>
  );
};

export default Cart;
