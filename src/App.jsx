import React, { useState, useEffect, useContext, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header.jsx";
/* import Animation from "../components/Animation.jsx"; */
import "./App.css";
import { CartProvider } from "../context/CartContext";

const Products = lazy(() => import("../components/Products"));
const Cart = lazy(() => import("../components/Cart"));
const CheckOut = lazy(() => import("../components/CheckOut.jsx"));
const Details = lazy(() => import("../components/UI/PDetails.jsx"));
const Profile = lazy(() => import("../components/Profile.jsx"));
const About = lazy(() => import("../components/About.jsx"));
const Login = lazy(() => import("../components/Login.jsx"));
const ProductList = lazy(() => import("../admin/ProductList.jsx"));
const ResultsComponent = lazy(() => import("../components/ResultComponent.jsx"));
import Loading from "../components/UI/Loading";
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
          <BrowserRouter>
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
                <Route path="/admin" element={<ProductList />} />
                <Route path="/results" element={<ResultsComponent />} />

              </Routes>
            </Suspense>
          </BrowserRouter>
        )}
        <ToastContainer />
      </CartProvider>
    </AuthContext.Provider>
  );
};

export default App;
