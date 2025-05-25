import express from "express";
const router = express.Router();

/**
 * Calculate price based on:
 * - Peak hours: 8–11 AM & 5–8 PM (50% surge)
 * - Base rate: ₹20/hour
 * - Monthly subscribers pay nothing
 */
router.post("/", (req, res) => {
  const { time, duration, subscription } = req.body;

  if (!time || !duration) {
    return res.status(400).json({ error: "Time and duration are required" });
  }

  if (subscription === true) {
    return res.json({ price: 0, message: "Included in Subscription" });
  }

  const hour = parseInt(time.split(":")[0]);
  const isPeak = (hour >= 8 && hour <= 11) || (hour >= 17 && hour <= 20);
  const baseRate = 20;
  const multiplier = isPeak ? 1.5 : 1;
  const total = Math.round(baseRate * duration * multiplier);

  res.json({
    price: total,
    isPeak,
    rateUsed: baseRate,
    duration,
    multiplier,
    message: isPeak ? "Peak Hour Rate" : "Normal Rate"
  });
});

export default router;
