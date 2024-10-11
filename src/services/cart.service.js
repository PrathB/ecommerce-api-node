const Cart = require("../models/cart.model");

async function createCart(user) {
  try {
    const cart = new Cart({ userId: user._id });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { createCart };
