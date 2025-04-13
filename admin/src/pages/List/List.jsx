import React, { useEffect, useState } from 'react'
import './List.css'
import { toast } from 'react-toastify';
import axios from 'axios';

function list() {
    const [list, setList] = useState([]);
    const BACKENDURL = "https://food-delivery-backend-dnyd.onrender.com";

    const listData = async () => {
        const fetchData = await axios.get(`${BACKENDURL}/api/foodRoute/list`)
        if (fetchData.data.success) {
            setList(fetchData.data.data)
        }
        else {
            toast.error("Errror")
        }
    }

    useEffect(() => {
        listData();
    }, [])

    const removeFood = async (foodId) => {

        const res = await axios.delete(`${BACKENDURL}/api/foodRoute/deletefood/${foodId}`);
        await listData()
        if(res.data.success)
        {
            toast.success(res.data.message)
        }
        else
        {
            toast.error("Error")
        }
    }
    return (
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {
                    list.map((item, index) => {
                        return (
                            <div className="list-table-format" key={index}>
                                <img src={`${BACKENDURL}/images/` + item.image} alt="" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p onClick={() => removeFood(item._id)} className='cursor'>x</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default list
