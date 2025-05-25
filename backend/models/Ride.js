import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pickupPoint: { type: String, required: true },
  dropPoint: { type: String, required: true },
  rideType: { type: String, required: true },
  schedule: { type: String, required: true },
  rideId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Ride", rideSchema);
