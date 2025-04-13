import express from "express";
import { addFood, listFood, deleteFood } from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";

const foodRouter = express.Router();

// Ensure 'uploads' directory exists
const uploadPath = "./uploads";
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Route for adding food with image upload
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/deletefood/:id", deleteFood);

export default foodRouter;
