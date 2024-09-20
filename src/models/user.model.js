const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    requried: true,
  },
  role: {
    type: String,
    requried: true,
    default: "CUSTOMER",
  },
  mobile: {
    type: String,
  },
  address: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  paymentInformation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "payment_information",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
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
});

const User = mongoose.model("users", userSchema);
module.exports = User;
