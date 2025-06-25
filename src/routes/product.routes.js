const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.get("/", productController.getProducts);
router.get("/product/:productId", productController.findProductById);
router.get("/featured", productController.getFeaturedProducts);
router.get("/search",productController.searchProducts);

module.exports = router;
