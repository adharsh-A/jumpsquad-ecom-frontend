import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import CartItem from "./UI/CartItem";
import Modal from "./UI/Modal";

const Cart = () => {
  const [checkoutData, setCheckoutData] = useState("");
  const [open, setOpen] = useState(false);
  const { cartItems, addToCart, calculateTotalPrice } = useContext(CartContext);
  const totalPrice = calculateTotalPrice(cartItems);
  const deliveryFee = 99;
  const price = (totalPrice + deliveryFee).toFixed(2);

  const subQuantity = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, quantity: -1 });
  };

  const addQuantity = (e, item) => {
    e.preventDefault();
    addToCart({ ...item, quantity: +1 });
  };
    const productsForCart = cartItems.map((item) => (
      <CartItem
      item={item}
      key={item.id}
      title={item.title}
      image={item.image}
      price={item.price}
      subQuantity={subQuantity}
      addQuantity={addQuantity}
      quantity={item.quantity}
      />
    ));
  const openCheckOut = () => {
    const checkoutData = `
          Total Price: ₹${price}`;

    setCheckoutData(checkoutData);
    setOpen(true);
  };
  const closeCheckOut = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        onClose={() => setOpen(false)}
        isOpen={open}
        onSubmit={closeCheckOut}
        display="Order Confirmation !"
        description={checkoutData}
        buttonname="Checkout"
      />
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
                {price}
              </label>

              <button className="checkout-btn" onClick={openCheckOut}>
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
