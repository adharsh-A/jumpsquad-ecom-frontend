import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = (props) => {
  return (
    <StyledWrapper>
        <Link to={`/${props.id}/details`}>
      <div className="card" >
        <div className="img" >
          <img src={props.image} alt="" width={50}/>
            </div>
        <div className="textBox">
          <div className="textContent">
            <p className="h1">{props.title}</p>
          </div>
          <p className="p">{props.description}</p>
          <div></div>
        </div>
      </div>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
  width: 100%;
  max-width: 290px;
  height: 70px;
  background: #353535;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
}

.card:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
}

.card:hover > .img {

  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}

.textBox {
  margin-left: 10px;
  color: white;
  font-family: 'Poppins' sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.h1 {
padding-top: 20px;
  font-size: 16px;
  font-weight: bold;
}

.p {
padding-bottom: 10px;
  font-size: 12px;
  font-weight: lighter;
}


`;

export default Card;
