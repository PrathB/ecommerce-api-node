const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const authenticate = require("../middleware/authenticate");
const { upload } = require("../config/cloudinaryConfig");

router.get("/", authenticate, productController.getAllProducts);
router.post(
  "/",
  authenticate,
  upload.single("image"),
  productController.createProduct
);
router.post("/creates", authenticate, productController.createMultipleProducts);
router.put("/:productId", authenticate, productController.updateProduct);
router.delete("/:productId", authenticate, productController.deleteProduct);

module.exports = router;
