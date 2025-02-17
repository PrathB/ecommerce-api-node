const UserService = require("../services/user.service");

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).send({ error: "JWT token not found" });
    }

    const user = await UserService.getUserProfileByToken(token);

    if (!user) {
      return res.status(401).send({ error: "Unauthorized: User not found" });
    }

    if (user.role !== "ADMIN") {
      return res
        .status(403)
        .send({ error: "Forbidden: Admin access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = authenticateAdmin;
