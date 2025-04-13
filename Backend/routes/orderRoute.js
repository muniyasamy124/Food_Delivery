import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { listOrder, placeOrder, updateStatus, userOrders, verfyOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verfyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/listorder", listOrder)
orderRouter.post("/status", updateStatus)
export default orderRouter;