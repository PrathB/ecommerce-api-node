const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart_items",
      required: true,
    },
  ],

  totalItems: {
    type: Number,
    default: 0,
    required: true,
  },
  subTotalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingCost: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Cart = mongoose.model("cart", cartSchema);
module.exports = Cart;
