import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../UI/Loading";
import "./PDetails.css";
import { toast } from 'react-toastify';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/auth-context';
import { Tilt } from 'react-tilt'

const PDetails = () => {
  const defaultOptions = {
    reverse:        true,  // reverse the tilt direction
    max:            25,     // max tilt rotation (degrees)
    perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
    scale:          1.07,    // 2 = 200%, 1.5 = 150%, etc..
    speed:          1000,   // Speed of the enter/exit transition
    transition:     true,   // Set a transition on enter/exit.
    axis:           null,   // What axis should be disabled. Can be X or Y.
    reset:          true,    // If the tilt effect has to be reset on exit.
    easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
  }
  const {addToCart,items} =useContext(CartContext)
  const {isLoggedIn}=useContext(AuthContext)
  const {id}=useParams(); // Convert id to a number if _id is a number
  const [currentProduct, setCurrentProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const product = items.find((item) => item._id ===id);
    if (product) {
      setCurrentProduct(product);
      setLoading(false);
    } else {
      // Handle case where the product is not found
      setLoading(false);
      navigate('/'); // Navigate to a different page if the product is not found
    }
  }, [id, items, navigate]);



  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };
  const cartHandler=(e,currentProduct)=>{
                e.preventDefault();
              if(!isLoggedIn){
                toast.error(`Login to add to cart`, {
                  position: "bottom-right",
                  autoClose: 2000,
                });
                  }else{
                addToCart({...currentProduct,quantity:1})

              }
  }
  

  const imageUrl = `${currentProduct.image}`;
  return (
    loading ? <Loading /> : (
      <div className="container">
        <button className='back-btn' onClick={handleBackClick}>
          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
          </svg>
          <span>Back</span>
        </button>
        <div className="wrapper">
          <Tilt options={defaultOptions} >
          <div className="banner-image">
            <img src={imageUrl} alt={currentProduct.title} />
          </div>
          </Tilt>
          <div className='details'>
            <h1>{currentProduct.title}</h1>
            <p>{currentProduct.description}</p>
            <div className="button-wrapper">
              <button className="btn outline" onClick={(e)=>cartHandler(e,currentProduct)}>ADD TO CART</button>
              <button className="btn fill">BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PDetails;
