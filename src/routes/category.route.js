const express = require("express");
const {categoryController} = require("../di/injection");
const { authMiddleware, adminAuthMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

// Public routes
router.get("/", categoryController.getAllCategory);
router.get("/:id", categoryController.getCategory);

// Admin only routes
router.post("/create", authMiddleware, adminAuthMiddleware, categoryController.createCategory);
router.delete("/:id",authMiddleware, adminAuthMiddleware, categoryController.removeCategory);


module.exports = router;