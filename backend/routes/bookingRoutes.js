import express from "express";
import { createBooking } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Create new booking
router.post("/", protect, createBooking);

// Cancel a booking
router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized or not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Cancel failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Check-in booking
router.patch("/:id/checkin", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized or not found" });
    }

    booking.status = "checked-in";
    await booking.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Check-in failed:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
