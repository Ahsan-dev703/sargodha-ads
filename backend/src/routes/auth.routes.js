import express from "express";
import {
  register,
  verifyEmailController,
  login,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmailController);
router.post("/login", login);

export default router;
