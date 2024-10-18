const Rating = require("../models/rating.model");
const ProductService = require("../services/product.service");

// create rating for a product
async function createRating(reqData, userId) {
  const product = await ProductService.findProductById(reqData.productId);

  const rating = new Rating({
    user: userId,
    product: product._id,
    rating: reqData.rating,
    createdAt: new Date(),
  });

  const savedRating = await rating.save();
  product.ratings.push(savedRating._id);
  await product.save();

  return savedRating;
}

// get all ratings of a product
async function getProductRatings(productId) {
  return await Rating.find({ product: productId });
}

module.exports = { createRating, getProductRatings };
