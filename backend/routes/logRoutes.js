import express from "express";
import fs from "fs";
import path from "path";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, (req, res) => {
  const logPath = path.join("logs", "access.log");

  fs.readFile(logPath, "utf8", (err, data) => {
    if (err) {
      console.error("Log read error:", err);
      return res.status(500).json({ message: "Could not read logs" });
    }

    const lines = data.trim().split("\n");
    const recent = lines.slice(-20); // Last 20 log lines
    res.json(recent);
  });
});

export default router;
