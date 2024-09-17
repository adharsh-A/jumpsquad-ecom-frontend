import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Order.css"

const Order = (props) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        let domainName;
        if (process.env.NODE_ENV === "production") {
          domainName = "https://jumpsquad-backend.vercel.app";
        } else {
          domainName = import.meta.env.VITE_API_URL;
        }
        const response = await axios.get(`${domainName}/api/orders/order`, {
          params: { orderId: orderId }, // Query parameter
        });
        setOrder(response.data);
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    };

    fetchOrder();
  }, []);
const fetchedOrders=order.map((order)=>{
  return <Link to={`/${order.productId}/details`} key={order._id}>
  <div key={order._id} className="order-card" >

  <img src={order.image} alt={order.title} width={"50px"}/>
    <h3>{order.title}</h3>
  <div>₹{order.price}</div>
  <div><strong>{order.quantity}units</strong></div>
  </div>
  </Link>

})
  return (
    <>
    <div className="wrapper">

        <h3>Your Order Details:</h3>
    <div className="order-container">
    {fetchedOrders}
    </div>
    </div>
    </>
  );
};

export default Order;
