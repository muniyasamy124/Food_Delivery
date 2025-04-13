import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios'
import { toast } from "react-toastify";

function Add() {
    const BACKENDURL = "https://food-delivery-backend-dnyd.onrender.com";
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "salad",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image); 
    
        try {
            const response = await axios.post(`${BACKENDURL}/api/foodRoute/add`, formData);
            if (response.data.success) {
                setData({ name: "", description: "", price: "", category: "Salad" });
                setImage(null); 
                toast.success(response.data.message)
            } else {
               toast.error(response.data.message)
            }
        } catch (error) {
            console.error("API Error:", error);
        }
    };
    

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    return (
        <div className="add">
            <form onSubmit={onSubmitHandler} className="flex-col">
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="upload img"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        required
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Type here"
                    />
                </div>
                <div className="add-description-name flex-col">
                    <p>Product Description</p>
                    <input
                        type="text"
                        name="description"
                        onChange={onChangeHandler}
                        value={data.description}
                        placeholder="Type content here"
                        required
                    />
                </div>
                <div className="add-category-price flex-col">
                    <div className="add-category flex-col">
                        <select name="category" onChange={onChangeHandler}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input
                        type="number"
                        onChange={onChangeHandler}
                        value={data.price}
                        name="price"
                        placeholder="$20"
                    />
                </div>
                <button type="submit" className="add-btn">
                    Add
                </button>
            </form>
        </div>
    );
}

export default Add;
