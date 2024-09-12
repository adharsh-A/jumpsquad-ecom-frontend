// MenuItems.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuItems.css";

const MenuItems = () => {
    const tasks = [
        { id: 0, title: "Add Products", linkTo: "/admin/add" },
        { id: 1, title: "Update Products", linkTo: "/admin/product/update" },
        { id: 2, title: "See all Products", linkTo: "/admin/products" },
        { id: 3, title: "See all Orders", linkTo: "/admin/orders" },
        { id: 4, title: "See all Users", linkTo: "/admin/users" },
      ];
  // Ensure tasks is properly passed as a prop and handle cases where it's undefined
  if (!tasks || tasks.length === 0) {
    return <p>No menu items available.</p>;  // Fallback in case tasks is empty or undefined
  }

  return (
    <div className="sidebar">
    <ul className="menu-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <NavLink
            to={task.linkTo}
            className="menu-link"
            activeClassName="active-link"
          >
            {task.title}
          </NavLink>
        </li>
      ))}
    </ul>
        </div>
  );
};

export default MenuItems;
