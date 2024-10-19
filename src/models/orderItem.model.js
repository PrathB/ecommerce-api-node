const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
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
// price for given quantity of product  
  price: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const OrderItem = mongoose.model("order_items", orderItemSchema);
module.exports = OrderItem;
