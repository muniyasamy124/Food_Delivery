// StoreContextProvider.js
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const storeContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [food_list, setFoodList] = useState([]);
  const BACKENTURL = "https://food-delivery-zn07.onrender.com/";
  // console.log("outer token", token);

  const addToCart = async (itemId) => {
    // console.log("Item id", itemId);
    // console.log("curr user", token);
    // const userId = localStorage.getItem('userId')
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        await axios.post(
          BACKENTURL + "api/cart/add",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } } 
        );
      } catch (error) {
        console.log("user", error);
      }
    }
  };

  const removeCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          BACKENTURL + "api/cart/remove",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log("user", error);
      }
    }
  };

  const subTotal = food_list.reduce((acc, item) => {
    if (cartItems[item._id]) {
      acc += item.price * cartItems[item._id];
    }
    return acc;
  }, 0);

  const getFoodList = async () => {
    try {
      const res = await axios.get(BACKENTURL + "api/foodRoute/list");
      setFoodList(res.data.data);
    } catch (error) {
      console.log("error fetching in foodlist", error);
    }
  };

  const lordCartData = async (token) => {
    const res = await axios.post(
      BACKENTURL + "api/cart/get",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
// console.log("lodddddddddd", res)
setCartItems(res.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await getFoodList();
      if (localStorage.getItem("logintoken")) {
        setToken(localStorage.getItem("logintoken"));
        await lordCartData(localStorage.getItem("logintoken"));
      }
    }
    loadData();
  }, []);

  const contextVal = {
    cartItems,
    setCartItems,
    addToCart,
    removeCart,
    subTotal,
    BACKENTURL,
    token,
    setToken,
    food_list,
    setFoodList,
    userId,
    setUserId,
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  return (
    <storeContext.Provider value={contextVal}>{children}</storeContext.Provider>
  );
};

export default StoreContextProvider;
