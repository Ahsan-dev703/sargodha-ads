import express from "express";

import authenticate from "../middleware/auth.middleware.js";
import {
  createAd,
  getAds,
  getMyAds,
  updateAd,
  deleteAd,
  getAdById,
} from "../controllers/ad.controller.js";

const router = express.Router();

router.post("/", authenticate, createAd);
router.get("/", getAds);
router.get("/my-ads", authenticate, getMyAds);
router.get("/:id", getAdById);
router.patch("/:id", authenticate, updateAd);
router.delete("/:id", authenticate, deleteAd);

export default router;
