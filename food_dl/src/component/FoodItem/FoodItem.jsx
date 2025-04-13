import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { storeContext } from "../../context/storeContext";

function FoodItem({ item }) {
  const { cartItems, addToCart, removeCart, BACKENTURL} = useContext(storeContext);
  // console.log('addtocart',addToCart)

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img src={BACKENTURL+"images/"+item.image} alt={item.image} className="food-item-image" />
        {!cartItems[item._id] ? (
          <img
            src={assets.add_icon_white}
            className="add"
            onClick={() =>{
              // console.log("addToCart id",item._id)
              addToCart(item._id)
            }}
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => removeCart(item._id)}
              alt="Remove Item"
              className="counter-btn"
            />
            <p className="counter-value">{cartItems[item._id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() =>{
                // console.log("addToCart id",item._id)
                addToCart(item._id)
              }}
              alt="Add Item"
              className="counter-btn"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{item.description}</p>
        <p className="food-item-price">${item.price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
