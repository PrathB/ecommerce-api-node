require("dotenv").config();
const mongoose = require("mongoose");

const mongodbURI = process.env.MONGODB_URI;
const connectDb = () => {
  return mongoose.connect(mongodbURI);
};

module.exports = { connectDb };
