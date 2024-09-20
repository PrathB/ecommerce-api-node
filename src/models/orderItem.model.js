const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    red: "orders",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    rquired: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const OrderItem = mongoose.model("order_items", orderItemSchema);
module.exports = OrderItem;
