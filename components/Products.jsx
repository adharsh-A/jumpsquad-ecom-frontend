    import React, { useContext, useEffect, useState } from "react"
    import Hero from "../components/Hero";
    import ProductList from "./UI/ProductList";
    import Loading from "../components/UI/Loading"
    import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
    
    const Products = (props) => {
      const {addItems,items}=useContext(CartContext);
      const [loading, setLoading] = useState(true);
      const [display,setDisplay]=useState([]);

      let localhost;
      if(process.env.NODE_ENV === 'production'){
        localhost = `https://jumpsquad-backend.vercel.app`;
      }else{
        localhost = `http://localhost:5000`;
      }

      useEffect(() => {
        fetch(`${localhost}/api/products/all`)
          .then((response) => {
            if (!response.ok) {
              toast.error(`Network response was not ok`, {
                position: "bottom-right",
                autoClose: 2000,
            });
            }
            return response.json();
          })
          .then((json) =>{
             addItems(json.products);
             
             setTimeout(() => {
               setLoading(false);
              }, 900);
              // Set timeout to delay showing the main content
              
            }
          )
          .catch((error) => {
            setLoading(false);
            
            console.error('Error fetching data:', error)
            toast.error(`Server Error`, {
              position: "bottom-right",
              autoClose: 2000,
            });
          });
          setDisplay(items);
          console.log(display);
      }, []);

    return (
        <>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Hero />
            <ProductList/>
          </>
        )}
      </>
    )
    };

    export default Products;
