const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order_items",
    },
  ],
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
  shippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "addresses",
    required: true,
  },
  paymentDetails: {
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "PENDING",
    },
  },
  totalItems: {
    type: Number,
    required: true,
    default: 1,
  },
  subTotalPrice: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "PENDING",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
