const express = require("express");
const path = require("path");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "welcome to ecommerce api", status: true });
});

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const userRouter = require("./routes/user.routes");
app.use("/api/users", userRouter);

const productRouter = require("./routes/product.routes");
app.use("/api/products", productRouter);

const adminProductRouter = require("./routes/adminProduct.routes");
app.use("/api/admin/products", adminProductRouter);

const cartRouter = require("./routes/cart.routes");
app.use("/api/cart", cartRouter);

const cartItemRouter = require("./routes/cartItem.routes");
app.use("/api/cart_items", cartItemRouter);

const adminOrderRouter = require("./routes/adminOrder.routes");
app.use("/api/admin/orders", adminOrderRouter);

const orderRouter = require("./routes/order.routes");
app.use("/api/orders", orderRouter);

const reviewRouter = require("./routes/review.routes");
app.use("/api/reviews", reviewRouter);

const ratingRouter = require("./routes/rating.routes");
app.use("/api/ratings", ratingRouter);

module.exports = app;

app;
