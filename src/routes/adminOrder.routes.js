const express = require("express");
const router = express.Router();

const orderController = require("../controller/adminOrder.controller");
const adminAuthenticate = require("../middleware/adminAuthenticate");

router.get("/", adminAuthenticate, orderController.getAllOrders);
router.put(
  "/:orderId/confirmed",
  adminAuthenticate,
  orderController.confirmOrder
);
router.put("/:orderId/shipped", adminAuthenticate, orderController.shipOrder);
router.put(
  "/:orderId/delivered",
  adminAuthenticate,
  orderController.deliverOrder
);
router.put(
  "/:orderId/cancelled",
  adminAuthenticate,
  orderController.cancelOrder
);
router.delete(
  "/:orderId/delete",
  adminAuthenticate,
  orderController.deleteOrder
);

module.exports = router;
