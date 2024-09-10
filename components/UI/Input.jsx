import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { items } = useContext(CartContext);
  const navigate = useNavigate();

  const filteredData = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate("/results", { state: { filteredData } });
      setSearchQuery("");
    }
  };

  const handleSelectItem = (item) => {
    // Navigate to the product detail page or take an action when a result is clicked
    navigate(`/${item.id}/details`);
    // Reset the search query
    setSearchQuery("");
  };

  return (
    <StyledWrapper>
      <div className="inputBox_container">
        <svg
          className="search_icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          alt="search icon"
        >
          <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z"></path>
        </svg>
        <input
          className="inputBox"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          id="inputBox"
          type="text"
          placeholder="Search For Products"
        />
      </div>

      {searchQuery && filteredData.length > 0 && (
        <div className="dropdown">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="dropdown-item"
              onClick={() => handleSelectItem(item)}
            >
              <div className="flex">
                <img src={item.image} width={30} alt="" />
                <span><em>{item.title}</em></span>
              </div>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>
      )}
      </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
.flex{
  display: flex;
  align-items: center;
  font-weight: 600;
}
  .flex span{
    margin-left: 0.5rem;
  }
  .inputBox_container {
    display: flex;
    align-items: center;
    flex-direction: row;
    max-width: 14em;
    width: fit-content;
    height: fit-content;
    background-color: #5c6370;
    opacity: 0.8;
    border-radius: 0.8em;
    overflow: hidden;
  }

  .search_icon {
    height: 1em;
    padding: 0 0.5em 0 0.8em;
    fill: #abb2bf;
  }

  .inputBox {
    background-color: transparent;
    color: #ffffff;
    outline: none;
    width: 100%;
    border: 0;
    padding: 0.5em 1.5em 0.5em 0;
    font-size: 1em;
  }

  ::placeholder {
    color: #abb2bf;
  }

  .dropdown {
    margin-top: 1rem;
    position: absolute;
    background-color: #ffffff82;
    border: 1px solid #ddd;
    border-radius: 0.4em;
    width: 20em;
    max-height: 10em;
    overflow-y: auto;
    box-shadow: 0 0.2em 0.5em rgba(0, 0, 0, 0.1);
    z-index: 10;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.5em;
    font-size: 0.8em;
    padding: 0.5em 1em;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }


  .dropdown-item:hover {
    background-color: #ffffff16;
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }
`;

export default Input;
