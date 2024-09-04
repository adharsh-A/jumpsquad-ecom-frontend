import React, { useEffect, useState } from "react"
import "../Cart.css";


const CartItem = (props) => {
  const {item} = props
  const [productTotal,setProductTotal] =useState(item.price);
useEffect(() => {
  setProductTotal(item.price*item.quantity);
},[item])
const localhost = 'https://jumpsquad-backend.vercel.app' || 'http://localhost:8080';

  return (
    <div className="product" id={props.key}>
<img src={`${localhost}/${props.image}`} alt="" />
    <div>
      <span>{props.title}</span>
      
    </div>
    <div className="quantity">
      <button onClick={(e)=>props.subQuantity(e,item)}>
        <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
        </svg>
      </button>
      <label>{props.quantity}</label>
      <button onClick={(e)=>props.addQuantity(e,item)} >
        <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
        </svg>
      </button>
    </div>
    <label className="price small">₹{productTotal}</label>
  </div>
  )
};

export default CartItem;
