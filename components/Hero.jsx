import React from "react"
import Animation from "../components/Animation";
import "../css/style.css"
import Button from "./UI/Button";
import { toast } from "react-toastify";

const Hero = (props) => {
  return (
    <div className="hero ">
        <div className="model">
        <Animation/>
        </div>
        
        <div className="intro">
            <h1> <span>Jump Squad</span></h1>
            <h3 >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam quasi optio excepturi reiciendis atque, velit doloribus eaque non.</h3>
            <Button text="Shop Now"     />
        </div>
        
    </div>
  )
};

export default Hero;
