const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required:true,
  },
  category: {
    level1: { type: String, required: true },
    level2: { type: String, required: true },
    level3: { type: String, required: true },
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  highlights: [
    {
      type: String,
      required: true,
    },
  ],
  specifications: {
    weight: {
      type: String,
    },
    dimensions: {
      type: String,
    },
    carMake: {
      type: String,
    },
    carModel: {
      type: String,
    },
    carSubModel: {
      type: String,
    },
    partBrand: {
      type: String,
    },
    partOrigin: {
      type: String,
    },
    netQuantity: {
      type: String,
    },
    countryOfOrigin: {
      type: String,
    },
    partNumber: {
      type: String,
      required: true,
    },
    partCategory: {
      type: String,
    },
  },
  compatibility: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ratings",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
});

productSchema.index({
  title: 'text',
  'category.level1': 'text',
  'category.level2': 'text',
  'category.level3': 'text',
  brand: 'text',
  'specifications.carMake': 'text',
  'specifications.partNumber': 'text',
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
