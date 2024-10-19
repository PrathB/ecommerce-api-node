const express = require("express");
const router = express.Router();
const orderController = require("../controller/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, orderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,orderController.confirmOrder);
router.put("/:orderId/shipped",authenticate,orderController.shipOrder);
router.put("/:orderId/delivered",authenticate,orderController.deliverOrder);
router.put("/:orderId/cancelled",authenticate,orderController.cancelOrder);
router.put("/:orderId/delete",authenticate,orderController.deleteOrder);

module.exports = router;
