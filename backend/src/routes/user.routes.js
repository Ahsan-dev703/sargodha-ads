import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authenticate, getCurrentUser);
router.patch("/me", authenticate, updateCurrentUser);

export default router;
