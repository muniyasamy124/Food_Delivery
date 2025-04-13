import express from 'express'
import { addToCard, removeFromCart, getData } from '../controllers/cardController.js';
import authMiddleware from '../middlewares/auth.js';

const cardRouter = express.Router();

cardRouter.post("/add", authMiddleware, addToCard);
cardRouter.post("/remove", authMiddleware, removeFromCart);
cardRouter.post("/get", authMiddleware,getData)

export default cardRouter;