import express from "express";
import {
  register,
  verifyEmailController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify-email/:token", verifyEmailController);

export default router;
