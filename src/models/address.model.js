const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    requried: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  mobile: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("addresses", addressSchema);
module.exports = Address;
