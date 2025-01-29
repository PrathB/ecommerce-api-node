const CartService = require("../services/cart.service");
const UserService = require("../services/user.service");
const Address = require("../models/address.model");
const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");

// function to create order from user's cart
async function createOrder(userId, shippingAddress) {
  let address;
  // checking if address already exist in db

  const existingAddress = await Address.findOne({
    user: userId,
    streetAddress: shippingAddress.streetAddress,
  });
  if (existingAddress) {
    address = existingAddress;
  } else {
    address = new Address(shippingAddress);
    address.user = userId;
    await address.save();
    const user = await UserService.findUserById(userId);
    user.address.push(address);
    await user.save();
  }

  const cart = await CartService.findUserCart(userId);

  // creating order from shipping address and cart
  const order = new Order({
    user: userId,
    shippingAddress: address,
    totalItems: cart.totalItems,
    subTotalPrice: cart.subTotalPrice,
    shippingCost: cart.shippingCost,
    totalPrice: cart.totalPrice,
  });

  // creating order items from cart items
  const orderItems = cart.cartItems.map((cartItem) => ({
    orderId: order._id,
    product: cartItem.product,
    quantity: cartItem.quantity,
    price: cartItem.price,
    user: userId,
  }));

  const createdOrderItems = await OrderItem.insertMany(orderItems);
  order.orderItems = createdOrderItems;

  order.orderItems = orderItems;
  const savedOrder = await order.save();

  const populatedOrder = await Order.findById(savedOrder._id)
    .populate("user")
    .populate("shippingAddress");

  populatedOrder.orderItems = await OrderItem.find({
    orderId: order._id,
  }).populate("product");

  return populatedOrder;
}

// for admin
async function placeOrder(orderId) {
  const order = await findOrderById(orderId);
  order.paymentDetails.paymentStatus = "COMPLETED";
  order.orderStatus = "PLACED";

  return await order.save();
}

// for admin
async function confirmOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CONFIRMED";

  return await order.save();
}

// for admin
async function shipOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "SHIPPED";

  return await order.save();
}

// for admin
async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "DELIVERED";

  return await order.save();
}

// for admin
async function cancelOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = "CANCELLED";

  return await order.save();
}

async function findOrderById(orderId) {
  try {
    const order = await Order.findById(orderId)
      .populate("user")
      .populate("shippingAddress");
    if (order) {
      order.orderItems = await OrderItem.find({ orderId: order._id }).populate(
        "product"
      );
    }

    return order;
  } catch (error) {
    throw new Error(error.message);
  }
}

// fxn for user to view order history
async function getUserOrderHistory(userId) {
  try {
    const orders = await Order.find({
      user: userId,
      orderStatus: { $in: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"] },
    })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

// fxn for admin to get all orders
async function getAllOrders() {
  const orders = await Order.find().populate("user");
  for (const order of orders) {
    order.orderItems = await OrderItem.find({
      orderId: order._id,
    }).populate("product");
  }

  return orders;
}

async function deleteOrder(orderId) {
  await Order.findByIdAndDelete(orderId);
  return "Order deleted succesfully";
}

module.exports = {
  createOrder,
  placeOrder,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  findOrderById,
  getUserOrderHistory,
  getAllOrders,
  deleteOrder,
};
