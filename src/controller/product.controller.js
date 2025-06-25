const ProductService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : null; // Get the Cloudinary image URL
    const productData = {
      ...req.body,
      quantity: Number(req.body.quantity),
      price: Number(req.body.price),
      discountedPrice: Number(req.body.discountedPrice),
      discountPercent: Number(req.body.discountPercent),
      category: JSON.parse(req.body.category),
      specifications: JSON.parse(req.body.specifications),
      highlights: JSON.parse(req.body.highlights),
      compatibility: JSON.parse(req.body.compatibility),
      imageUrl,
    };

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

const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getProducts(req.query);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductService.getFeaturedProducts();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getNonFeaturedProducts = async (req, res) => {
  try {
    const products = await ProductService.getNonFeaturedProducts();
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

const addProductToFeatured = async (req, res) => {
  const productId = req.params.productId;
  try {
    await ProductService.addProductToFeatured(productId);
    return res
      .status(200)
      .send({ message: "Product added to featured collection successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const addMultipleProductsToFeatured = async (req, res) => {
  try {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds)) {
      return res.status(400).json({ message: "Invalid product list" });
    }

    await ProductService.addMultipleProductsToFeatured(productIds);
    return res
      .status(200)
      .send({ message: "Products added to featured collection successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeProductFromFeatured = async (req, res) => {
  const productId = req.params.productId;
  try {
    await ProductService.removeProductFromFeatured(productId);
    return res.status(200).send({
      message: "Product removed from featured collection successfully",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  try {
    const products = await ProductService.searchProducts(q);
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  findProductById,
  getProducts,
  getAllProducts,
  getFeaturedProducts,
  getNonFeaturedProducts,
  createMultipleProducts,
  addProductToFeatured,
  addMultipleProductsToFeatured,
  removeProductFromFeatured,
  searchProducts,
};
