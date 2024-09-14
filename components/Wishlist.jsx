import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Wishlist.css";
import Card from "../admin/components/Card";

const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  // Check if wishlist exists and has items
  let wishlistItems;
  if (!wishlist || wishlist.length === 0) {
    wishlistItems = (
      <div className="wishlist-item">
        <p>Your wishlist is empty.</p>
      </div>
    );
  } else {
    wishlistItems = wishlist.map((item) => (
      <Card
        key={item.id}
        item={item}
        id={item.id}
        image={item.image}
        title={item.title}
        price={item.price}
      />
    ));
  }

  return (
    <div className="container-wishlist">
      <div className="wishlist">
        <h1>Wishlist</h1>
        <div className="wishlist-item">{wishlist && wishlistItems}</div>
      </div>
    </div>
  );
};

export default Wishlist;
