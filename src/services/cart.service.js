const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
  try {
    const cart = new Cart({ userId: user._id });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

// function to find user cart and update totalItems,subTotalPrice,shippingCost,totalPrice
async function findUserCart(userId) {
  try {
    const cart = await Cart.findOne({ userId: userId });
    cart.cartItems = await CartItem.find({ cartId: cart._id }).populate(
      "product"
    );

    let totalItems = 0;
    let subTotalPrice = 0;
    let shippingCost = 0;
    let totalPrice = 0;

    for (let cartItem of cart.cartItems) {
      totalItems += cartItem.quantity;
      subTotalPrice += cartItem.price * cartItem.quantity;
    }

    // shippingCost calculation
    totalPrice = subTotalPrice + shippingCost;

    cart.totalItems = totalItems;
    cart.subTotalPrice = subTotalPrice;
    cart.shippingCost = shippingCost;
    cart.totalPrice = totalPrice;

    return cart;
  } catch (error) {
    throw new Error(errror.message);
  }
}

// function to create a cart item from product and add it to cart
async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ userId: userId });
    const product = await Product.findOne(req.productId);

    const isCartItemCreated = await CartItem.findOne({
      cartId: cart._id,
      product: product._id,
      userId: userId,
    });
    if (!isCartItemCreated) {
      // creating cart item
      const cartItem = new CartItem({
        cartId: cart._id,
        product: product._id,
        quantity: req.quantity,
        price: product.discountedPrice,
        userId: userId,
      });
      // adding to cart
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return "Item added to cart successfully";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createCart, findUserCart, addCartItem };
