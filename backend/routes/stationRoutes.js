import express from "express";
import { getCacheWithTTL, setCache } from "../utils/cacheStore.js";

const router = express.Router();

const staticStations = [
  "Sector 18",
  "Noida City Centre",
  "Botanical Garden",
  "Rajiv Chowk",
  "Huda City Centre"
];

// TTL in milliseconds
const STATION_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

router.get("/", (req, res) => {
  const cached = getCacheWithTTL("stations", STATION_CACHE_TTL);

  if (cached) {
    console.log("[CACHE] Stations served from memory");
    return res.json(cached);
  }

  // Simulate DB or static source
  setCache("stations", staticStations);
  console.log("[DB] Stations loaded fresh & cached");
  res.json(staticStations);
});

export default router;
