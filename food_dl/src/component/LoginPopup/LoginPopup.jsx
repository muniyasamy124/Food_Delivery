import React from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { storeContext } from "../../context/storeContext";
import axios from 'axios'

function LoginPopup({ setShowLogin }) {
  const { BACKENTURL, setToken, userId, setUserId } = useContext(storeContext)
  const [currState, setCurrState] = useState("login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handlerChange = (event) => {
    const { name, value } = event.target;
    setData(data => ({ ...data, [name]: value.trim() }))
  }

  const onLogin = async (event) => {
    event.preventDefault()
    let newURL = BACKENTURL;
    if (currState === "login") {
      newURL += "api/user/login"
    }
    else {
      newURL += "api/user/register"
    }

    const response = await axios.post(newURL, data);
    // console.log("login resss",response)

    if (response.data.success) {
      setToken(response.data.token)
      setUserId(response.data.userId)
      localStorage.setItem("logintoken", response?.data?.token)
      // localStorage.setItem("userId", response?.data?.userId)
      setShowLogin(false)
    }
    else {
      alert(response.data.message)
    }
  }
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState == "login" ? (
            <></>
          ) : (
            <input type="text" name="name" onChange={handlerChange} value={data.name} placeholder="Your Name" required />
          )}
          <input type="email" name="email" onChange={handlerChange} value={data.email} placeholder="Your Email" required />
          <input type="password" name="password" onChange={handlerChange} value={data.password} placeholder="password" required />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & Privacy policy</p>
        </div>
        {currState === "login" ? (
          <p>
            Create a new account
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account
            <span onClick={() => setCurrState("login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
