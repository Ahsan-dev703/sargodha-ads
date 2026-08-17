import express from "express";
import {
  register,
  verifyEmailController,
  resendVerificationEmail,
  login,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  logout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmailController);
router.post("/resend-verification", resendVerificationEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.post("/logout", logout);

export default router;
