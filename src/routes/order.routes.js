const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate,orderController.createOrder);
router.get("/:orderId",authenticate,orderController.findOrderById);
router.get("/user",authenticate,orderController.getUserOrderHistory);

module.exports = router;