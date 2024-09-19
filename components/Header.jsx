import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Input from "./UI/Input";
import "../css/style.css";
import { AuthContext } from "../context/auth-context";
import Modal from "./UI/Modal";
//mui
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Header = (props) => {
  const { role, isLoggedIn, logout } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout(); // Call the logout function from context
    setOpen(false);
    navigate("/"); // Redirect to the home page or login page after logout
  };
  // mui
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleItemClick = (text) => {
    if (text === "Edit Profile") {
      navigate("/profile");
    } else if (text === "My Orders") {
      navigate("/orders");
    } else if (text === "Notifications") {
      navigate("/notifications");
    } else if (text === "Logout") {
      setOpen(true);
    }
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, marginTop: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Edit Profile", "My Orders", "Notifications", "Logout"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleItemClick(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          isOpen={open}
          onSubmit={logoutHandler}
          display="Logging Out?"
          description="you will be logged out. Are you sure?"
          buttonname="Log Out"
        />
      )}
      <nav className="header flex">
        <div className="logo-img">
          <Link exact to="/">
            <img src="/images/brand-logo1.png" alt="" className="logo" />
          </Link>
        </div>
        <Input />
        <ul className="header-elements flex">
          <li className="fields">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <li className="fields">
              <NavLink to="/cart" className="nav-link" activeClassName="active">
                Cart
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="fields">
              <NavLink
                to="/wishlist"
                className="nav-link"
                activeClassName="active"
              >
                Wishlist
              </NavLink>
            </li>
          )}
          <li className="fields">
            <NavLink to="/about" className="nav-link" activeClassName="active">
              About
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li className="fields">
              <NavLink
                to="/login"
                className="nav-link"
                activeClassName="active"
              >
                Login/Register
              </NavLink>
            </li>
          )}
          {role === "admin" && (
            <li className="fields">
              <NavLink
                to="/admin"
                className="nav-link"
                activeClassName="active"
              >
                Admin Panel
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="fields">
              <NavLink
                onClick={() => {
                  setOpen(true);
                }}
                className="logout-button"
              >
                Logout
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li className="fields">
              <NavLink
                onClick={toggleDrawer(true)}
                className="profile-link"
                activeClassName="active"
              >
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="profile-logo"
                />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Header;
