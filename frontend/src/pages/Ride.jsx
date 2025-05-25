import { useState } from "react";
import API from "../services/api";
import RideForm from "../components/RideForm";
import RideSummary from "../components/RideSummary";
import { toast } from "react-toastify";

const Ride = () => {
  const [rideData, setRideData] = useState(null);

const handleRideSubmit = async (form) => {
  const start = performance.now();
  try {
    const rideId = Math.random().toString(36).substr(2, 8);

    const res = await API.post("/rides", {
      ...form,
      rideId,
    });

    const time = performance.now() - start;
    console.log(`[RIDE] Success in ${Math.round(time)}ms`);

    toast.success("Ride booked");
    const saved = {
      ...res.data,
      createdAt: new Date(res.data.createdAt).toLocaleString(),
    };
    localStorage.setItem("latestRide", JSON.stringify(saved));
    setRideData(saved);

  } catch (err) {
    toast.error("Ride booking failed");
    console.error("[RIDE ERROR]:", err);
  }
};


  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-start py-10 px-4">
      <div className="max-w-2xl w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          {rideData ? "Your Ride is Booked!" : "Book a Last-Mile Ride"}
        </h2>

        {rideData ? (
          <RideSummary ride={rideData} />
        ) : (
          <RideForm onSubmit={handleRideSubmit} />
        )}
      </div>
    </div>
  );
};

export default Ride;
