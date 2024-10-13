const CartService = require("../services/cart.service");
const UserService = require("../services/user.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");

// function to create order from user's cart
async function createOrder(userId, shippingAddress) {
  let address;
  // checking if address already exist in db
  if (shippingAddress._id) {
    let existingAddress = await Address.findById(shippingAddress._id);
    address = existingAddress;
  } else {
    address = new Address(shippingAddress);
    address.userId = userId;
    await address.save();
    const user = await UserService.findUserById(userId);
    user.address.push(address);
    await user.save();
  }

  const cart = await CartService.findUserCart(userId);

  const order = new Order({
    userId: userId,
    shippingAddress: address,
    totalItems: cart.totalItems,
    subTotalPrice: cart.subTotalPrice,
    shippingCost: cart.shippingCost,
    totalPrice: cart.totalPrice,
  });

  const orderItems = cart.cartItems.map((cartItem) => ({
    orderId: order._id,
    product: cartItem.product,
    quantity: cartItem.quantity,
    price: cartItem.price,
    userId: userId,
  }));

  const createdOrderItems = await OrderItem.insertMany(orderItems);
  order.orderItems = createdOrderItems;

  order.orderItems = orderItems;
  const savedOrder = await order.save();

  return savedOrder;
}

module.exports = { createOrder };
