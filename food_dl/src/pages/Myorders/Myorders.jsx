import React, { useContext } from 'react'
import { storeContext } from '../../context/storeContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './Myorders.css'

function Myorders() {
    const { BACKENTURL, token } = useContext(storeContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        const response = await axios.post(BACKENTURL+"api/order/userorders", {}, { headers: { Authorization: `Bearer ${token}` } });
        setData(response.data.data);
        // console.log("orderData", response.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    // console.log("My ORDER", data)
  return (
    data.map((order, index)=>{
        return (
            <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt=''/>
                <p>{
                    order.items.map((item, index) => {
                        if(index === order.items.length-1)
                        {
                            return item.name + " X " +item.quantity
                        }
                        else{
                            return item.name + " X " +item.quantity+","
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button>Track Order</button>
            </div>
        )
    })
 
  )
}

export default Myorders