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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 1000,
                color: "#ffffff",
                cursor: "pointer",
              }}
              onClick={() =>
                window.open(
                  "https://github.com/adharsh-a",
                  "_blank"
                )
              }
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
              />
            </svg>{" "}
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
