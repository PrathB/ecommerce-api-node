const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, productController.getAllProducts);
router.get("/product/:productId", authenticate, productController.findProductById);

module.exports = router;
