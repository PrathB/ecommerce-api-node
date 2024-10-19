const ReviewServcice = require("../services/review.service");

const createReview = async (req, res) => {
  const user = req.user;
  try {
    const review = await ReviewServcice.createReview(req.body, user._id);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getProductReviews = async (req, res) => {
  const productId = req.params.productId;
  try {
    const reviews = await ReviewServcice.getProductReviews(productId);
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createReview, getProductReviews };
