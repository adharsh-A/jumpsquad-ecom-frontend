import React, { useContext } from "react";
import { NavLink,Link, useNavigate } from "react-router-dom";
import  SearchBar  from "../components/UI/SearchBar";
import Input from "./UI/Input";
import Animation from "../components/Animation";
import "../css/style.css";
import { AuthContext } from "../context/auth-context";
import Modal from "./UI/Modal"; ;

const Header = (props) => {

  const {role,isLoggedIn,logout} =useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();  // Call the logout function from context
    setOpen(false);
    navigate('/');  // Redirect to the home page or login page after logout
  };
  return (
   <>
{open&&
 										<Modal onClose={() => setOpen(false)}
										isOpen={open}
										onSubmit={logoutHandler}
										display="Logging Out?"
										description="you will be logged out. Are you sure?"
										 buttonname="Log Out"
										/>}
      <nav className="header flex">
      <div className="logo-img">
        <Link exact  to="/">
        <img src="/images/brand-logo1.png" alt="" className="logo" />
        </Link>
      </div>
      <Input/>
      <ul className="header-elements flex">
        <li className="fields">
          <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
        </li>
        {isLoggedIn &&
        <li className="fields">
          <NavLink to="/cart" className="nav-link" activeClassName="active">Cart</NavLink>
        </li>
          }
        {isLoggedIn &&
        <li className="fields">
          <NavLink to="/wishlist" className="nav-link" activeClassName="active">Wishlist</NavLink>
        </li>
          }
        <li className="fields">
          <NavLink to="/about" className="nav-link" activeClassName="active">About</NavLink>
        </li>
       {!isLoggedIn && <li className="fields">
          <NavLink to="/login" className="nav-link" activeClassName="active">Login/Register</NavLink>
        </li>}
        {role==="admin" && <li className="fields">
          <NavLink to="/admin" className="nav-link" activeClassName="active">Admin Panel</NavLink>
        </li>}
        {isLoggedIn && (
          <li className="fields">
            <NavLink onClick={()=>{setOpen(true)}} className="logout-button">Logout</NavLink>
          </li>
        )}
        {isLoggedIn && <li className="fields">
          <NavLink to="/profile" className="profile-link" activeClassName="active">
          <img src="/images/profile.png" alt="Profile" className="profile-logo" />
          </NavLink>
        </li>}
      </ul>
    </nav>
    </>
  );
};

export default Header;
