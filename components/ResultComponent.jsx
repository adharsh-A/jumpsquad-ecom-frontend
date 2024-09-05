import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./UI/ProductCard";
import { CartContext } from "../context/CartContext";

const ResultsComponent = () => {
  const {isLoggedIn}=useContext(CartContext );
  const location = useLocation();
  const { filteredData } = location.state || { filteredData: [] }; // Get the filtered data from the location state

  const cartHandler=(e,item)=>{
    e.preventDefault();
    if(!isLoggedIn){
      toast.error(`Login to add to cart`, {
        position: "bottom-right",
        autoClose: 2000,
      });
        }else{
      addToCart({...item,quantity:1})
    }
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" , marginTop: "20px",fontSize: "30px",fontWeight:"50",colorGradient: "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)",}}>Search Results</h1>
      {filteredData.length > 0 ? (
      <div className="product-list" style={{ display: "flex", flexWrap: "wrap" ,margin: "0px 60px"}} >
          {filteredData.map((item) => (
            <ProductCard
              item={item}
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              addcart={(e)=>cartHandler(e,item)}
            />
          ))}
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default ResultsComponent;
