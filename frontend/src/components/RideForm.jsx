import { useState } from "react";
import { RIDE_TYPES } from "../utils/constants";

const RideForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    pickupPoint: "",
    dropPoint: "",
    rideType: "",
    schedule: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-green-700 font-medium mb-1">Pickup Point</label>
        <input
          type="text"
          name="pickupPoint"
          value={form.pickupPoint}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
          placeholder="Metro Station Exit A"
        />
      </div>

      <div>
        <label className="block text-green-700 font-medium mb-1">Drop Point</label>
        <input
          type="text"
          name="dropPoint"
          value={form.dropPoint}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
          placeholder="Home / Office"
        />
      </div>

      <div>
        <label className="block text-green-700 font-medium mb-1">Ride Type</label>
        <select
          name="rideType"
          value={form.rideType}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select</option>
          {RIDE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-green-700 font-medium mb-1">Schedule Time</label>
        <input
          type="datetime-local"
          name="schedule"
          value={form.schedule}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 rounded transition"
      >
        Book Ride
      </button>
    </form>
  );
};

export default RideForm;
