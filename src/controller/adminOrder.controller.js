const OrderService = require("../services/order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const confirmOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderService.confirmOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shipOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderService.shipOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderService.deliverOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderService.cancelOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await OrderService.deleteOrder(orderId);
    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  confirmOrder,
  shipOrder,
  deliverOrder,
  cancelOrder,
  deleteOrder,
};
