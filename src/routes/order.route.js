const express = require("express");
const { orderController } = require("../di/injection");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

// User routes
router.get("/", authMiddleware, orderController.getAllOrders);
router.get("/:id", authMiddleware, orderController.getOrderById);
router.post("/create", authMiddleware, orderController.createOrder);

module.exports = router;