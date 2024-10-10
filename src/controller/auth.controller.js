const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user.service");
const cartService = require("../services/cart.service");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);

    await cartService.createCart(User);

    return res.status(200).send({ jwt, message: "Registration Successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    const user = userService.getUserByEmail;
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with email: ", email });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send(jwt, { message: "Login Successful" });
  } catch (error) {
    return res.status().send({ error: error.message });
  }
};

module.exports = { register, login };
