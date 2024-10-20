const CartItemService = require("../services/cartItem.service");

const updateCartItem = async (req, res) => {
  const user = req.user;
  const cartItemId = req.params.cartItemId;
  try {
    const updatedCartItem = await CartItemService.updateCartItem(
      user._id,
      cartItemId,
      req.body
    );
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  const user = req.user;
  const cartItemId = req.params.cartItemId;
  try {
    await CartItemService.removeCartItem(user._id, cartItemId);
    return res.status(200).send({ message: "Cart item removed successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { updateCartItem, removeCartItem };
