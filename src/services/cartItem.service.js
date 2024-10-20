const UserService = require("../services/user.service");
const CartItem = require("../models/cartItem.model");

// function to update cart item quantity and price
async function updateCartItem(userId, cartItemId, cartItemData) {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await UserService.findUserById(cartItem.user);
    if (!user) {
      throw new Error("User not found: ", userId);
    }
    // checking if cartItem belongs to user
    if (user._id.toString() === userId.toString()) {
      cartItem.quantity = cartItemData.quantity;
      cartItem.price = cartItemData.quantity * cartItem.product.discountedPrice;
      const updatedCartItem = await cartItem.save();
      return updatedCartItem;
    } else {
      throw new Error("You can't update another user's cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeCartItem(userId, cartItemId) {
  try {
    const cartItem = await findCartItemById(cartItemId);
    const user = await UserService.findUserById(cartItem.user);
    if (!user) {
      throw new Error("User not found");
    }
    // checking if cartItem belongs to user
    if (user._id.toString() === userId.toString()) {
      await CartItem.findByIdAndDelete(cartItemId);
    } else {
      throw new Error("You can't delete another user's cart item");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findCartItemById(cartItemId) {
  try {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (!cartItem) {
      throw new Error("Cart item not found with id: ", cartItemId);
    }
    return cartItem;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { updateCartItem, removeCartItem, findCartItemById };
