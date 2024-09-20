import React, { useContext } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import Button from "@mui/material/Button";
import "./AdminDashboard.css";

// Import admin dashboard components
import Dashboard from "./admin/Dashboard.jsx";
import Orders from "./admin/Orders.jsx";
import Products from "./admin/Products.jsx";
import Users from "./admin/Users.jsx";
import { AuthContext } from "../context/auth-context.js";

const drawerWidth = 240;

export const AdminDashboard = () => {
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="admin-dashboard">

    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{ backgroundColor: "black", color: "#fff", height: "65px" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "black",
            color: "#fff",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem
            button
            component={Link}
            to="dashboard"
            sx={{
              "&:hover": {
                backgroundColor: "#444", // Change background on hover
                color: "#fff", // Change text color on hover
              },
            }}
          >
            <DashboardIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="orders"
            sx={{
              "&:hover": {
                backgroundColor: "#444", // Change background on hover
                color: "#fff", // Change text color on hover
              },
            }}
          >
            <ShoppingCartIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="products"
            sx={{
              "&:hover": {
                backgroundColor: "#444", // Change background on hover
                color: "#fff", // Change text color on hover
              },
            }}
          >
            <InventoryIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="users"
            sx={{
              "&:hover": {
                backgroundColor: "#444", // Change background on hover
                color: "#fff", // Change text color on hover
              },
            }}
          >
            <PeopleIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, color: "white" }}>
        <Toolbar />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </Box>
    </Box>
        </div>
  );
};

export default AdminDashboard;
