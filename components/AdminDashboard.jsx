import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
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
import Stats from "./admin/Stats.jsx";
import Orders from "./admin/Orders.jsx";
import Products from "./admin/Products.jsx";
import Users from "./admin/Users.jsx";

const drawerWidth = 240;

export const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        style={{ backgroundColor: "black", color: "#fff", height : "80px" }}
      >
        <Toolbar>
          <Typography variant="h5" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
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
          <ListItem button component={Link} to="dashboard"     sx={{
      '&:hover': {
        backgroundColor: '#444', // Change background on hover
        color: '#fff',            // Change text color on hover
      },
    }}>
            <DashboardIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="stats"     sx={{
      '&:hover': {
        backgroundColor: '#444', // Change background on hover
        color: '#fff',            // Change text color on hover
      },
    }}>
            <BarChartIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Stats" />
          </ListItem>
          <ListItem button component={Link} to="orders"     sx={{
      '&:hover': {
        backgroundColor: '#444', // Change background on hover
        color: '#fff',            // Change text color on hover
      },
    }}>
            <ShoppingCartIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={Link} to="products"     sx={{
      '&:hover': {
        backgroundColor: '#444', // Change background on hover
        color: '#fff',            // Change text color on hover
      },
    }}>
            <InventoryIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button component={Link} to="users"     sx={{
      '&:hover': {
        backgroundColor: '#444', // Change background on hover
        color: '#fff',            // Change text color on hover
      },
    }}>
            <PeopleIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "gray", color: "white" }}
      >
        <Toolbar />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stats" element={<Stats />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="/" element={<Navigate to="dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
