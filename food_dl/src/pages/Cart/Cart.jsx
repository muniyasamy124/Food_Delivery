import React, { useContext } from "react";
import "./Cart.css";
import { storeContext } from "../../context/storeContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, food_list, removeCart, subTotal,BACKENTURL } = useContext(storeContext);

  const navigate = useNavigate();
  const isCartEmpty = subTotal === 0;
  const deliveryFee = isCartEmpty ? 0 : 2; 
  const total = subTotal + deliveryFee;
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-items-title cart-items-item">
                <img src={BACKENTURL+"images/"+item.image} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeCart(item._id)} class="cross">x</p>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>
                ${subTotal}
                </p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${deliveryFee}</p>
            </div>
            <div className="cart-total-details">
              <p>$Total</p>
              <p>{total}</p>
            </div>
            <hr />
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>if you have a promocode enter it to here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
