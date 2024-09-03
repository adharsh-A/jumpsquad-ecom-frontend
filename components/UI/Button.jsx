import React from "react"
import "./Button.css";
import { Link } from "react-router-dom";
const Button = (props) => {
  return (
    
   <button className="btn" >{props.text}</button>
  
 
  )
};

export default Button;
