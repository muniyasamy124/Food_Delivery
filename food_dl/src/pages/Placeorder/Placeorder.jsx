import React, { useContext, useState, useEffect } from "react";
import "./Placeorder.css";
import { storeContext } from "../../context/storeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Placeorder() {
  const { subTotal, token, food_list, cartItems, BACKENTURL } = useContext(storeContext);
  const navigate = useNavigate();

  const isCartEmpty = subTotal === 0;
  const deliveryFee = isCartEmpty ? 0 : 2;
  const total = subTotal + deliveryFee;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  useEffect(() => {
    if (!token || total === 0) {
      navigate("/cart");
    }
  }, [token, total, navigate]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: total
    };

    try {
      const response = await axios.post(
        `${BACKENTURL}api/order/place`,
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">
          <div className="multifeilds">
            <input required type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" />
            <input required type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" />
          </div>
          <input required type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email Address" />
          <input required type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" />
          <div className="multifeilds">
            <input required type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" />
            <input required type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" />
          </div>
          <div className="multifeilds">
            <input required type="text" name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder="Zip Code" />
            <input required type="text" name="country" value={data.country} onChange={onChangeHandler} placeholder="Country" />
          </div>
          <input required type="text" name="phone" value={data.phone} onChange={onChangeHandler} placeholder="Phone" />
        </p>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>${subTotal}</p>
            </div>
            <div className="cart-total-details">
              <p>${deliveryFee}</p>
            </div>
            <div className="cart-total-details">
              <p>${total}</p>
            </div>
            <hr />
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default Placeorder;
