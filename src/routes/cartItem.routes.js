const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller");
const authenticate = require("../middleware/authenticate");

router.put("/:cartItemId", authenticate, cartItemController.updateCartItem);
router.delete("/:cartItemId", authenticate, cartItemController.removeCartItem);

module.exports = router;
