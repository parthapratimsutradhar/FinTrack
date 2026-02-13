import express from "express";
import {
  register,
  login,
  logout,
  getProfile,
  updateProfileController,
  uploadProfilepic,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema, updateProfileSchema } from "../schemas/auth.schema.js"; // Zod schemas
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Validate request body before calling controller
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, getProfile);
router.put("/update/:id", authMiddleware, validate(updateProfileSchema), updateProfileController);
router.put("/profile-pic/:id", authMiddleware, upload.single("profilePic"), uploadProfilepic);

export default router;
