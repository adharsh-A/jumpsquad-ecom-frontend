import React from "react";
import "./Card.css";

const Card = (props) => {
  return (
      <div className="stats shadow" style={{width: `${props.width}px`,height: `${props.height}px`}}>
        <div className="stat">
          <div className="stat-title">{props.title}</div>
          <div className="stat-value">{props.value}</div>
          <div className="stat-desc">{props.desc}</div>
        </div>
      </div>
  );
};

export default Card;
