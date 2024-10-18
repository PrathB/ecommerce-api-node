const Review = require("../models/review.model");
const ProductService = require("../services/product.service");

// create a review for a product
async function createReview(reqData, userId) {
  const product = await ProductService.findProductById(reqData.productId);

  const review = new Review({
    user: userId,
    product: product._id,
    review: reqData.review,
    createdAt: new Date(),
  });

  const savedReview = await review.save();
  product.reviews.push(savedReview._id);
  await product.save();

  return savedReview;
}

// get all reviews of a product
async function getProductReviews(productId) {
  return await Review.find({ product: productId }).populate("user");
}

module.exports = { createReview, getProductReviews };
