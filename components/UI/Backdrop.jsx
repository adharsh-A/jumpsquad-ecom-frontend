import React from 'react';
import './Backdrop.css'; // Import the CSS file for styling

const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

export default Backdrop;
