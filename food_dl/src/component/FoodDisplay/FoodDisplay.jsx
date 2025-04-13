import React, { useContext } from "react";
import "./FoodDisplay.css";
import { storeContext } from "../../context/storeContext";
import FoodItem from "../FoodItem/FoodItem";
import { useEffect } from "react";

function FoodDisplay({ category }) {
    const { food_list, setFoodList } = useContext(storeContext);
    // console.log("Foooddddd", food_list)
    if (!food_list) {
        return <p>Loading food items...</p>; 
    }

    // console.log('foodlist',food_list)

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes Near You</h2>
            <div className="food-display-list">
              {
                food_list.filter((item) => category === "All" || category === item.category)
                .map((item,index) => (
                    <FoodItem item={item} key={index} />
                ))
               
              }
            </div>
        </div>
    );
}

export default FoodDisplay;
