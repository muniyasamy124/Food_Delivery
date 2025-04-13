import foodModel from "../models/foodModel.js";
import mongoose from "mongoose";

import fs from "fs";

//add fooditem

const addFood = async (req, res) => {
  // console.log("Received file:", req.file); // Debugging

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "Image upload failed" });
  }

  let image_filename = req.file.filename; // Correctly access the filename

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added Successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error Adding Food" });
  }
};

// get food list

const listFood = async (req, res) => {
  try {
    const list = await foodModel.find({});
    res.json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching food list:", error); // Improved logging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// delete foodlist

const deleteFood = async (req, res) => {
  // console.log("Food ID to delete:", req.params.id);

  try {
    const foodId = req.params.id;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(foodId)) {
      return res.status(400).json({ success: false, message: "Invalid Food ID" });
    }

    // Find food item by ID
    const food = await foodModel.findById(foodId);
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Delete the image file
    const imagePath = `uploads/${food.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image:", err);
      }
    });

    // Delete the food item from the database
    const deletedFood = await foodModel.findByIdAndDelete(foodId);
    if (!deletedFood) {
      return res.status(500).json({ success: false, message: "Failed to delete food" });
    }

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error deleting food" });
  }
};

export { addFood, listFood, deleteFood };
