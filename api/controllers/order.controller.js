import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return next(createError(404, "Gig not found"));
    }

    // Check if order already exists
    const existingOrder = await Order.findOne({
      gigId: gig._id,
      clientId: req.userId,
      isCompleted: false,
    });

    if (existingOrder) {
      return res.status(200).json({
        message: "Order already exists",
        orderId: existingOrder._id,
      });
    }

    // Create new order
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      price: gig.price,
      clientId: req.userId,
      expertId: gig.userId,
      payment_intent: "temporary",
    });

    const savedOrder = await newOrder.save();

    res.status(200).json({
      message: "Order created successfully",
      orderId: savedOrder._id,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isWorker ? { expertId: req.userId } : { clientId: req.userId }),
    }).sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

// Add this new function to update order status
export const updateOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { isCompleted, payment_intent } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        isCompleted,
        payment_intent,
      },
      { new: true }
    );

    if (!updatedOrder) {
      return next(createError(404, "Order not found"));
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
