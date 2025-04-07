const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db.config");
const categoryRoute = require("./routes/category.route");
const productRoute = require("./routes/product.route");
const userRoute = require("./routes/user.route");
const orderRoute = require("./routes/order.route");

const app = express();

dbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/category", categoryRoute);

app.use("/product", productRoute);

app.use("/user", userRoute);

app.use("/order", orderRoute);

module.exports = app;