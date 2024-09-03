    import React, { useEffect, useState ,useContext } from "react"
    import ProductCard from "../UI/ProductCard";
    import { CartContext } from "../../context/CartContext";
    import { toast } from "react-toastify";
    import "./ProductList.css";
import { AuthContext } from "../../context/auth-context";
    
    const ProductList = (props) => {
      const {isLoggedIn} = useContext(AuthContext);
      const [visibleItemsCount, setVisibleItemsCount] = useState(4);
        const [fetchedItems, setFetchedItems] = useState([]);  
        const { addToCart,items } = useContext(CartContext);

        useEffect(() => {
            if (items && Array.isArray(items)) {
              setFetchedItems(items);
              console.log(typeof(fetchedItems));
            }
          }, [props.items]);

          const showMoreItems = () => {
            setVisibleItemsCount((prevCount) => prevCount + 4);
          };
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
          const products = fetchedItems.slice(0, visibleItemsCount).map((item) => (
            <ProductCard key={item._id} item={item} addcart={(e)=>cartHandler(e,item)} />
          ));
     
        
        return (
          <div>
      <div className="products-list" >
        {products}
      </div>
      {visibleItemsCount < fetchedItems.length && (
        <button onClick={showMoreItems} className="show-more-button">
          Show More
        </button>
      )}
    </div>
    )
    };

    export default ProductList;