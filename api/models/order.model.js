import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    expertId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: true,
    },
    payment_intent: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
