const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const adminAuthenticate = require("../middleware/adminAuthenticate");
const { upload } = require("../config/cloudinaryConfig");

router.get("/", adminAuthenticate, productController.getAllProducts);
router.post(
  "/",
  adminAuthenticate,
  upload.single("image"),
  productController.createProduct
);
router.post(
  "/creates",
  adminAuthenticate,
  productController.createMultipleProducts
);

router.put(
  "/featured/:productId",
  adminAuthenticate,
  productController.addProductToFeatured
);
router.delete(
  "/featured/:productId",
  adminAuthenticate,
  productController.removeProductFromFeatured
);

router.put("/:productId", adminAuthenticate, productController.updateProduct);
router.delete(
  "/:productId",
  adminAuthenticate,
  productController.deleteProduct
);

module.exports = router;
