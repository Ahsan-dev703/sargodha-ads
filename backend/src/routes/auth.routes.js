import express from "express";
import {
  register,
  verifyEmailController,
  login,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmailController);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

export default router;
