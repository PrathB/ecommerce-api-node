const OrderService = require("../services/order.service");

const createOrder = async (req, res) => {
  const user = req.user;
  try {
    const createdOrder = await OrderService.createOrder(user._id, req.body);
    return res.status(201).send(createdOrder);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderService.findOrderById(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getUserOrderHistory = async (req, res) => {
  const user = req.user;
  try {
    const orders = await OrderService.getUserOrderHistory(user._id);
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createOrder, findOrderById, getUserOrderHistory };
