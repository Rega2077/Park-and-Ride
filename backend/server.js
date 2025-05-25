import morgan from "morgan";
import fs from "fs";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import stationRoutes from "./routes/stationRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";


dotenv.config();
connectDB();

const app = express();
const accessLogStream = fs.createWriteStream(
  path.join("logs", "access.log"),
  { flags: "a" } // append mode
);
app.use(morgan("dev")); // logs to console
app.use(morgan("combined", { stream: accessLogStream })); // logs to file
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/stations", stationRoutes);
app.use("/api/pricing", pricingRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
