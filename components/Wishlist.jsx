import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./Wishlist.css";
import Card from "../admin/components/Card";

const Wishlist = () => {
  const { wishlist } = useContext(CartContext);
  const wishlistItems = wishlist.map((item) => (
    <Card
      key={item.id}
      item={item}
      id={item.id}
      image={item.image}
      title={item.title}
      price={item.price}
    />
  ));

  return (
    <div className="container-wishlist">
      <div className="wishlist">
        <h1>Wishlist</h1>
        <div className="wishlist-item">{wishlistItems}</div>
      </div>
    </div>
  );
};

export default Wishlist;
