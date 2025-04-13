import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { storeContext } from "../../context/storeContext";

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const { subTotal, token, setToken } = useContext(storeContext);

  // console.log("token navvvv", token)
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("logintoken");
    localStorage.removeItem('userId')
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}>
          Menu
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}>
          Contact Us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="searchicon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={subTotal === 0 ? "" : "dot"}></div>
        </div>
        {/* {console.log("result for token", token)} */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In </button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} />
            <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate("myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Order</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
