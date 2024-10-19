const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
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

const CartItem = mongoose.model("cart_items", cartItemSchema);
module.exports = CartItem;
