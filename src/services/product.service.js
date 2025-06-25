const Product = require("../models/product.model");
const { cloudinary } = require("../config/cloudinaryConfig");
const FeaturedProduct = require("../models/featuredProduct.model");

async function createProduct(reqData) {
  const category = {
    level1: reqData.category.level1,
    level2: reqData.category.level2,
    level3: reqData.category.level3,
  };
  const product = new Product({
    title: reqData.title,
    imageUrl: reqData.imageUrl,
    category: category,
    quantity: reqData.quantity,
    price: reqData.price,
    discountedPrice: reqData.discountedPrice,
    discountPercent: reqData.discountPercent,
    brand: reqData.brand,
    description: reqData.description,
    highlights: reqData.highlights,
    specifications: reqData.specifications,
    compatibility: reqData.compatibility,
  });

  return await product.save();
}

async function createMultipleProducts(products) {
  for (const product of products) {
    await createProduct(product);
  }
}

async function deleteProduct(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.imageUrl) {
    const imageUrlParts = product.imageUrl.split("/");
    const publicIdWithExtension = imageUrlParts[imageUrlParts.length - 1];
    const publicId = `ecommerce-products/${
      publicIdWithExtension.split(".")[0]
    }`;

    await cloudinary.uploader.destroy(publicId);
  }

  await Product.findByIdAndDelete(productId);

  return "Product and associated image deleted successfully";
}

async function updateProduct(productId, reqData) {
  return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(productId) {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error(`Product not found with id: ${productId}`);
  }

  return product;
}

async function getProducts(reqQuery) {
  let {
    category,
    carMake,
    minPrice,
    maxPrice,
    minDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 10;

  let query = Product.find();

  // Filter by category if provided
  if (category && category != "null") {
    let categoryArr = category.split(",").map((cat) => cat.trim());
    categoryArr = categoryArr.map((str) => (str ? str.replace(/-/g, " ") : ""));
    query = query
      .find({
        $or: [
          { "category.level1": { $in: categoryArr } },
          { "category.level2": { $in: categoryArr } },
          { "category.level3": { $in: categoryArr } },
        ],
      })
      .collation({ locale: "en", strength: 2 });
  }

  // Filter by carMake if provided
  if (carMake && carMake != "null") {
    // Step 1: Convert carMake to an array, trim spaces, replace hyphens with spaces, and convert to lowercase
    let carMakesArray = carMake
      .split(",")
      .map((make) => make.trim().replace(/-/g, " ").toLowerCase())
      .filter(Boolean); // Removes empty strings

    // Step 2: Query with case-insensitive matching
    query = query.where({
      $expr: { $in: [{ $toLower: "$specifications.carMake" }, carMakesArray] },
    });
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where("discountPercent").gte(minDiscount);
  }

  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock == "out_of_stock") {
      query = query.where("quantity").equals(0);
    }
  }

  if (sort) {
    const sortDirection = sort == "high_to_low" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProducts = await Product.countDocuments(query);

  // pagination
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages: totalPages };
}

async function getAllProducts() {
  const products = Product.find().sort({ createdAt: -1 });
  return products;
}

async function getFeaturedProducts() {
  const products = FeaturedProduct.find().populate("product");
  return products;
}

async function getNonFeaturedProducts() {
  const featuredProducts = await FeaturedProduct.find().select("product");
  const featuredProductIds = featuredProducts.map((fp) => fp.product);
  const nonFeaturedProducts = await Product.find({
    _id: { $nin: featuredProductIds },
  });
  return nonFeaturedProducts;
}

async function addProductToFeatured(productId) {
  const productExists = await findProductById(productId);

  const alreadyFeatured = await FeaturedProduct.findOne({ product: productId });
  if (alreadyFeatured) {
    throw new Error("Product is already in featured collection");
  }

  const featuredProduct = new FeaturedProduct({ product: productId });
  await featuredProduct.save();
}

async function addMultipleProductsToFeatured(productIds) {
  for (const id of productIds) {
    await addProductToFeatured(id);
  }
}

async function removeProductFromFeatured(productId) {
  const productExists = await findProductById(productId);
  const alreadyFeatured = await FeaturedProduct.findOne({ product: productId });
  if (!alreadyFeatured) {
    throw new Error("Product is already not featured");
  }

  await FeaturedProduct.findOneAndDelete({
    product: productId,
  });
}

async function searchProducts(query) {
  const results = await Product.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  return results;
}

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
