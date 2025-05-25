import express from "express";
import { createRide } from "../controllers/rideController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRide);

export default router;
