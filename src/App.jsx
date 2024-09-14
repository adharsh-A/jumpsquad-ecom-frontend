import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header.jsx";
/* import Animation from "../components/Animation.jsx"; */
import "./App.css";
import { CartProvider } from "../context/CartContext";

const Products = lazy(() => import("../components/Products.jsx"));
const Cart = lazy(() => import("../components/Cart.jsx"));
const CheckOut = lazy(() => import("../components/CheckOut.jsx"));
const Details = lazy(() => import("../components/UI/PDetails.jsx"));
const Profile = lazy(() => import("../components/Profile.jsx"));
const About = lazy(() => import("../components/About.jsx"));
const Login = lazy(() => import("../components/Login.jsx"));
const ProductList = lazy(() => import("../admin/ProductList.jsx"));
const ResultsComponent = lazy(() => import("../components/ResultComponent.jsx"));
const ProductForm = lazy(() => import("../admin/ProductForm.jsx"));
const Wishlist = lazy(() => import("../components/Wishlist.jsx"));
import Loading from "../components/Wishlist.jsx";
import { useAuth } from "../hooks/auth-hook.js";
import { AuthContext } from "../context/auth-context.js";

const App = () => {
  const { token, role, login, logout, userId } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        role: role,
        login: login,
        logout: logout,
      }}
    >
      <CartProvider>
        {loading ? (
          <Loading />
        ) : (
          <Router>
            <Header />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" exact element={<Products />} />
                {token && <Route path="/cart" exact element={<Cart />} />}
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/:id/details" element={<Details />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/results" element={<ResultsComponent />} />
                {role === "admin" && <Route path="/admin" element={<ProductList />} />}
                {token && <Route path="/wishlist" element={<Wishlist />} />}
                

              </Routes>
            </Suspense>
          </Router>
        )}
        <ToastContainer />
      </CartProvider>
    </AuthContext.Provider>
  );
};

export default App;
