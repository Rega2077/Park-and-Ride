import Ride from "../models/Ride.js";

export const createRide = async (req, res) => {
  try {
    const { pickupPoint, dropPoint, rideType, schedule, rideId } = req.body;

    const ride = await Ride.create({
      userId: req.user._id,
      pickupPoint,
      dropPoint,
      rideType,
      schedule,
      rideId,
    });

    res.status(201).json(ride);
  } catch (err) {
    console.error("Ride creation failed:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
