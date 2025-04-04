const express = require("express");
const { productController } = require("../di/injection");
const {adminAuthMiddleware, authMiddleware} = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);

// Admin only routes
router.post("/create", authMiddleware, adminAuthMiddleware, productController.createProduct);
router.put("/:id", authMiddleware, adminAuthMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, adminAuthMiddleware, productController.removeProduct);

module.exports = router;