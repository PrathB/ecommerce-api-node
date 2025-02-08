const ProductService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null; // Get the Cloudinary image URL
    const productData = { ...req.body, imageUrl };

    const product = await ProductService.createProduct(productData);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const message = await ProductService.deleteProduct(productId);
    return res.status(200).send({ message });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const updatedProduct = await ProductService.updateProduct(
      productId,
      req.body
    );
    return res.status(200).send(updatedProduct);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await ProductService.findProductById(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const createMultipleProducts = async (req, res) => {
  try {
    await ProductService.createMultipleProducts(req.body);
    return res.status(201).send({ message: "Products created successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getAllProducts,
  createMultipleProducts,
};
