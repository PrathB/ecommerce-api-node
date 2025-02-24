const mongoose = require("mongoose");
const { Schema } = mongoose;

const featuredProductSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
});

const FeaturedProduct = mongoose.model(
  "featured_products",
  featuredProductSchema
);
module.exports = FeaturedProduct;
