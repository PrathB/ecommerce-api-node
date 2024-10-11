const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to ecommerce api", status: true });
});

const authRoutes = require("./routes/auth.route");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.route");
app.use("/api/users", userRoutes);
module.exports = app;

app;
