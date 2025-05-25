import { useEffect, useState } from "react";
import { STATIONS as FALLBACK_STATIONS } from "../utils/constants";
import API from "../services/api";

const BookingForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    location: "",
    date: "",
    time: "",
    duration: "",
  });

  const [stations, setStations] = useState(FALLBACK_STATIONS);
  const [price, setPrice] = useState(null);
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    const isActive = localStorage.getItem("sub_active") === "true";
    setSubscription(isActive);
  }, []);

  // Load station list
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const cached = localStorage.getItem("stations");
        if (cached) {
          setStations(JSON.parse(cached));
          return;
        }

        const res = await API.get("/stations");
        localStorage.setItem("stations", JSON.stringify(res.data));
        setStations(res.data);
      } catch (err) {
        console.warn("Using fallback stations due to error:", err);
        setStations(FALLBACK_STATIONS);
      }
    };

    fetchStations();
  }, []);

  const refreshStations = async () => {
    try {
      localStorage.removeItem("stations");
      const res = await API.get("/stations");
      localStorage.setItem("stations", JSON.stringify(res.data));
      setStations(res.data);
    } catch (err) {
      console.error("Failed to refresh stations:", err);
      setStations(FALLBACK_STATIONS);
    }
  };

  // 🔁 Real-time price fetch from backend
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        if (!form.time || !form.duration) return;

        const res = await API.post("/pricing", {
          time: form.time,
          duration: Number(form.duration),
          subscription,
        });

        if (res.data?.price === 0) {
          setPrice("Included in Subscription");
        } else {
          setPrice(`₹${res.data.price} (${res.data.message})`);
        }
      } catch (err) {
        console.error("Failed to fetch price:", err);
        setPrice("Error calculating price");
      }
    };

    fetchPrice();
  }, [form.time, form.duration, subscription]);

  const handleChange = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, subscription }); // include subscription flag
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Location */}
      <div>
        <label className="block text-green-700 mb-1 font-medium">Select Location</label>
        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">-- Choose a metro station --</option>
          {stations.map((station) => (
            <option key={station} value={station}>
              {station}
            </option>
          ))}
        </select>

        {/* Manual Refresh */}
        <div className="text-right mt-1">
          <button
            type="button"
            onClick={refreshStations}
            className="text-sm text-green-700 hover:underline"
          >
            Refresh Stations ↻
          </button>
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-green-700 mb-1 font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Time + Duration */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-green-700 mb-1 font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
            className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-green-700 mb-1 font-medium">Duration (hrs)</label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            required
            min="1"
            max="12"
            className="w-full border border-green-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Subscription Plan */}
      <div className="mt-3">
        <label className="inline-flex items-center gap-2 text-green-800 text-sm">
          <input
            type="checkbox"
            checked={subscription}
            onChange={() => setSubscription(!subscription)}
          />
          Use monthly subscription plan
        </label>
      </div>

      {/* Price Display */}
      {price && (
        <div className="mt-2 text-sm text-green-800 font-medium">
          <span>Estimated Price: </span>
          <span className="font-bold">{price}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-semibold transition mt-4"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
