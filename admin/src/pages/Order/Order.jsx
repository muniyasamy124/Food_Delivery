import React, { useState, useEffect } from 'react';
import './Order.css';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from '../../assets/assets';

function Order({ url }) {
  const [order, setOrder] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/listorder");
      if (response.data.success) {
        setOrder(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.error(error);
    }
  };

  const statusHandler = async(event, orderId) =>
  {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if(response.data.success)
    {
      await fetchAllOrders()
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {order.length === 0 ? (
          <p>No orders available</p>
        ) : (
          order.map((orderItem, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="parcel" />
              <div>
                <p className="order-item-food">
                  {orderItem.items.map((item, idx) =>
                    idx === orderItem.items.length - 1
                      ? `${item.name} x${item.quantity}`
                      : `${item.name} x${item.quantity}, `
                  )}
                </p>
                <p className="order-item-name">
                  {
                    orderItem.address.firstName+""+orderItem.address.lastName
                  }
                </p>
                <div className="order-item-address">
                  <p>{orderItem.address.street+","}</p>
                  <p>{orderItem.address.city+","+orderItem.address.state+", "+orderItem.address.country}</p>
                </div>
                <p className="order-item-phone">{orderItem.address.phone}</p>
              </div>
              <p>Items: {orderItem.items.length}</p>
              <p>${orderItem.amount}</p>
              <select onChange={(event)=>statusHandler(event,orderItem._id)} value={orderItem.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
