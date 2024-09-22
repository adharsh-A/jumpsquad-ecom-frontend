import React, { useState, useEffect, Suspense, lazy, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header.jsx";
/* import Animation from "../components/Animation.jsx"; */
import "./App.css";
import { CartProvider } from "../context/CartContext";
import "./tailwind.css";

const Products = lazy(() => import("../components/Products.jsx"));
const Cart = lazy(() => import("../components/Cart.jsx"));
const CheckOut = lazy(() => import("../components/CheckOut.jsx"));
const Details = lazy(() => import("../components/UI/PDetails.jsx"));
const EditProfile = lazy(() => import("../components/Profile.jsx"));
const About = lazy(() => import("../components/About.jsx"));
const Login = lazy(() => import("../components/Login.jsx"));
const ProductList = lazy(() => import("../admin/ProductList.jsx"));
const ResultsComponent = lazy(() =>
  import("../components/ResultComponent.jsx")
);
const ProductForm = lazy(() => import("../admin/ProductForm.jsx"));
const Wishlist = lazy(() => import("../components/Wishlist.jsx"));
const Orders = lazy(() => import("../components/Orders.jsx"));
const PrivacyPolicy = lazy(() => import("../components/Privacy.jsx"));
const TermsOfService = lazy(() => import("../components/TermsOfService.jsx"));
const Order = lazy(() => import("../components/Order.jsx"));
import Loading from "../components/UI/Loading.jsx";
import { useAuth } from "../hooks/auth-hook.js";
import { AuthContext } from "../context/auth-context.js";
const AdminDashboard = lazy(() => import("../components/AdminDashboard.jsx"));

const App = () => {
  const auth = useContext(AuthContext);
  const { token, role, login, logout, userId } = useAuth();
  useEffect(() => {
    if (!userId) {
      try {
        login(
          "66d55c761d3b4cb41e6f2a28",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkaGFyc2gxMjMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjY5ODM1NjAsImV4cCI6MTcyNjk4NzE2MH0.-OWF1Blh_pGfZrTn0YMfmEN8-Jf_oDLZV5jiPeVLFiU",
          "admin"
        );
        toast("Logged in as demo",{
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (err) {
        console.log(err);
        toast(err);
      }
    }
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

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
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/:id/details" element={<Details />} />
                <Route path="/profile" element={<EditProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/results" element={<ResultsComponent />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/order/:orderId" element={<Order />} />

                {role === "admin" && (
                  <Route path="/add" element={<ProductList />} />
                )}
                {role === "admin" && (
                  <Route path="/admin/*" element={<AdminDashboard />} />
                )}
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
