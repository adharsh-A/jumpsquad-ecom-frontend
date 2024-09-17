import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar } from "@mui/material";
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
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }} style={{backgroundColor: "#333", color: "#fff"}}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div"  >
            Admin Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box", backgroundColor: "#333", color: "#fff" }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem button component={Link} to="dashboard">
            <DashboardIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="stats">
            <BarChartIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Stats" />
          </ListItem>
          <ListItem button component={Link} to="orders">
            <ShoppingCartIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={Link} to="products">
            <InventoryIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button component={Link} to="users">
            <PeopleIcon sx={{ color: "white", mr: 2 }} />
            <ListItemText primary="Users" />
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f4f4f4", p: 3 ,color: "#333"}}>
        <Toolbar />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stats" element={<Stats />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
