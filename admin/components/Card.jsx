import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = (props) => {
  return (
    <StyledWrapper>
      <Link to={`/${props.id}/details`}>
        <div className="item-card">
          <div className="item-card1">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className="wishlist-img">
                <img src={props.image} alt={props.title} width={30} />
              </div>
              <p>{props.title}</p>
              <p className="small">{props.description}</p>
            </div>
            <div style={{ marginRight: "2rem" }} className="wishlist-price">
              ₹{props.price}
            </div>
            <div className="go-corner">
              <div className="go-arrow">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .wishlist-img {
    margin-left: 10px;
    margin-right: 10px;
    mix-blend-mode: multiply;
    z-index: 1;
  }

  .item-card p {
    font-size: 1rem;
    font-weight: 700;
    line-height: 20px;
    color: #666;
    }
    
    .item-card p.small {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
  }

  .go-corner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 32px;
    height: 32px;
    overflow: hidden;
    top: 0;
    right: 0;
    background-color:black;
    border-radius: 0 4px 0 32px;
  }

  .go-arrow {
    margin-top: -4px;
    margin-right: -4px;
    color: white;
    font-family: courier, sans;
  }

  .item-card1 {
    align-items: center;
    min-height: 4rem;
    display: flex;
    position: relative;
    background-color: #f2f8f9;
    border-radius: 10px;
    text-decoration: none;
    justify-content: space-between;
    z-index: 0;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 1px solid #f2f8f9;
  }

  .item-card1:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background: black;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(1);
    transform-origin: 50% 50%;
    transition: transform 0.25s ease-out;
  }

  .item-card1:hover:before {
    transform: scale(21);
  }

  .item-card1:hover p {
    transition: all 0.3s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }
  .item-card1:hover .wishlist-price {
    transition: all 0.3s ease-out;
    color: rgba(255, 255, 255, 0.8);
  }
  .item-card1:hover .wishlist-image {
    mix-blend-mode: multiply !important;
  }

  .item-card1:hover h3 {
    transition: all 0.3s ease-out;
    color: #fff;
  }

  .item-card2 {
    display: block;
    top: 0px;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;
    border: 1px solid #f2f8f9;
  }

  .item-card2:hover {
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
    top: -4px;
    border: 1px solid #ccc;
    background-color: #cccccc;
    }
    
  .item-card2:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: -16px;
    right: -16px;
    background-color: #cccccc;
    height: 32px;
    width: 32px;
    border-radius: 32px;
    transform: scale(2);
    transform-origin: 50% 50%;
    transition: transform 0.15s ease-out;
  }

  .item-card2:hover:before {
    transform: scale(2.15);
  }

  .item-card3 {
    display: block;
    top: 0px;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid #f2f8f9;
  }

  .item-card3 .go-corner {
    opacity: 0.7;
  }

  .item-card3:hover {
    border: 1px solid #00838d;
    box-shadow: 0px 0px 999px 999px rgba(255, 255, 255, 0.5);
    z-index: 500;
  }

  .item-card3:hover p {
    color: #00838d;
  }

  .item-card3:hover .go-corner {
    transition: opactiy 0.3s linear;
    opacity: 1;
  }

  .item-card4 {
    display: block;
    top: 0px;
    position: relative;
    max-width: 262px;
    background-color: #fff;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    overflow: hidden;
    border: 1px solid #ccc;
  }

  .item-card4 .go-corner {
    background-color: #00838d;
    height: 100%;
    width: 16px;
    padding-right: 9px;
    border-radius: 0;
    transform: skew(6deg);
    margin-right: -36px;
    align-items: start;
    background-image: linear-gradient(-45deg, #8f479a 1%, #dc2a74 100%);
  }

  .item-card4 .go-arrow {
    transform: skew(-6deg);
    margin-left: -2px;
    margin-top: 9px;
    opacity: 0;
  }

  .item-card4:hover {
    border: 1px solid #cd3d73;
    }

  .item-card4 h3 {
    margin-top: 8px;
  }

  .item-card4:hover .go-corner {
    margin-right: -12px;
  }

  .item-card4:hover .go-arrow {
    opacity: 1;
  }
`;

export default Card;
