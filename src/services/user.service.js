const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;
    const doesUserExist = await User.findOne({ email });

    if (doesUserExist) {
      throw new Error("User already exists with email: ", email);
    }

    password = await bcrypt.hash(password, 8);

    const user = await User.create({ firstName, lastName, email, password });
    console.log("Created new user ", user);

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error("user not found with id: ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found with email: ", email);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken;

    const user = await findUserById(userId);

    if (!user) {
      throw new Error("user not found with id: ", userId);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
