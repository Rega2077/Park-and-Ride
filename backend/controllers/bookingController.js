import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { location, date, time, duration, slotAssigned, bookingId } = req.body;

    const booking = await Booking.create({
      userId: req.user._id,
      location,
      date,
      time,
      duration,
      slotAssigned,
      bookingId,
      status: "pending"
    });

    // ✅ Simulate auto-cancel after 3 mins if not checked-in
    setTimeout(async () => {
      const latest = await Booking.findById(booking._id);
      if (latest && latest.status === "pending") {
        latest.status = "cancelled";
        await latest.save();
        console.log(`⛔ Booking ${latest.bookingId} auto-cancelled`);
      }
    }, 180000); // 3 minutes = 180000 ms — can set 30s for demo

    res.status(201).json(booking);
  } catch (err) {
    console.error("Booking creation failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
