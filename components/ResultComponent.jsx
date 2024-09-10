import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./UI/ProductCard";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import "./ResultComponent.css";

const ResultsComponent = () => {
  const { isLoggedIn, addToCart } = useContext(CartContext);
  const location = useLocation();
  const { filteredData } = location.state || { filteredData: [] };

  // State to manage filtering options
  const [sortOption, setSortOption] = useState(""); // Sorting criteria: 'priceAsc', 'priceDesc', 'popularity'

  const cartHandler = (e, item) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error(`Login to add to cart`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      addToCart({ ...item, quantity: 1 });
    }
  };

  // Sort and filter logic
  const handleSort = (items) => {
    if (sortOption === "priceAsc") {
      return [...items].sort((a, b) => a.price - b.price);
    }
    if (sortOption === "priceDesc") {
      return [...items].sort((a, b) => b.price - a.price);
    }
    if (sortOption === "popularity") {
      return [...items].sort((a, b) => b.popularity - a.popularity);
    }
    return items; // Default, no sorting
  };

  const sortedData = handleSort(filteredData); // Apply sorting

  return (
    <div>
      <div className="search-results" style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: "20px" }}>

      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "30px",
          fontWeight: "50",
          color: "whitesmoke",
        }}
      >
        Search Results
      </h1>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <label htmlFor="sort">Filter</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">filter</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      </div>

      {sortedData.length > 0 ? (
        <div
          className="product-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0px 60px",
            justifyContent: "center",
          }}
        >
          {sortedData.map((item) => (
            <ProductCard
              item={item}
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              addcart={(e) => cartHandler(e, item)}
            />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "white" }}>No results found</p>
      )}
    </div>
  );
};

export default ResultsComponent;
