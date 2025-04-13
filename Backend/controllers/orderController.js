import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing Order for frontend

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173/";
  try {
    const newOrder = new orderModel({
      userId: req.body.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.id, { cartData: {} });

    const line_item = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "delivery charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: "payment",
      success_url: `${frontend_url}verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "errorrr" });
  }
};

const verfyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Users Orders for frontend

const userOrders = async (req, res) => {
  const userId = req.body.id
  // console.log('userId', req.body.id)
  try {
    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
};

// Listing Order For Admin Pannel

const listOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

// api for updating order status

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "status Updated" })
  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}
export { placeOrder, verfyOrder, userOrders, listOrder, updateStatus };
