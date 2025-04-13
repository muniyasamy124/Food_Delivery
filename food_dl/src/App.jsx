import React from "react";
import Navbar from "./component/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Placeorder from "./pages/Placeorder/Placeorder";
import Footer from "./component/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./component/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import Myorders from "./pages/Myorders/Myorders";

function App() {
  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Placeorder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<Myorders />} />
      </Routes>
      <Footer />
    </div>
    </>
  );
}

export default App;
