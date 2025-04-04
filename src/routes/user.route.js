const express = require("express");
const { userController } = require("../di/injection");
const {authMiddleware} = require("../middleware/auth.middleware");


const router = express.Router();

// Public routes
router.post("/register", userController.registerUser);
router.post("/login", userController.userLogin);

// User routes with login details
router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUser);
router.put("/:id", authMiddleware, userController.updateUser);
router.delete("/:id", authMiddleware, userController.removeUser);

module.exports = router;