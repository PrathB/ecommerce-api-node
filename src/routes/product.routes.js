const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.get("/", productController.getAllProducts);
router.get("/product/:productId", productController.findProductById);

module.exports = router;
