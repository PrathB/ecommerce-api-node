const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

// function to create cart when user registers
async function createCart(userId) {
  try {
    const cart = new Cart({ user: userId });
    const createdCart = await cart.save();
    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

// function to find user cart and update totalItems,subTotalPrice,shippingCost,totalPrice
async function findUserCart(userId) {
  try {
    const cart = await Cart.findOne({ user: userId });
    cart.cartItems = await CartItem.find({ cartId: cart._id }).populate(
      "product"
    );

    let totalItems = 0;
    let subTotalPrice = 0;
    let shippingCost = 0;
    let totalPrice = 0;

    for (let cartItem of cart.cartItems) {
      totalItems += cartItem.quantity;
      subTotalPrice += cartItem.price;
    }

    // shippingCost calculation
    totalPrice = subTotalPrice + shippingCost;

    cart.totalItems = totalItems;
    cart.subTotalPrice = subTotalPrice;
    cart.shippingCost = shippingCost;
    cart.totalPrice = totalPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

// function to create a cart item from product and add it to cart
async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findOne(req.productId);
    if (!product) {
      throw new Error("Invalid product Id: ", req.productId);
    }

    const isCartItemCreated = await CartItem.findOne({
      cartId: cart._id,
      product: product._id,
      user: userId,
    });
    if (!isCartItemCreated) {
      // creating cart item
      const cartItem = new CartItem({
        cartId: cart._id,
        product: product._id,
        quantity: req.quantity,
        price: product.discountedPrice * req.quantity,
        user: userId,
      });
      // adding to cart
      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem);
      await cart.save();
      return createdCartItem;
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = { createCart, findUserCart, addCartItem };
