import { useState } from "react";
import BookingForm from "../components/BookingForm";
import BookingSummary from "../components/BookingSummary";
import API from "../services/api";
import { toast } from "react-toastify";


const Booking = () => {
  const [bookingData, setBookingData] = useState(null);

const handleBookingSubmit = async (form) => {
  const startTime = performance.now();
  try {
    const bookingId = Math.random().toString(36).substr(2, 8);
    const slotAssigned = `Slot-${Math.floor(Math.random() * 100) + 1}`;

    const res = await API.post("/bookings", {
      ...form,
      slotAssigned,
      bookingId,
    });

    const duration = performance.now() - startTime;
    console.log(`[BOOKING] Completed in ${Math.round(duration)}ms`);

    toast.success("Booking successful");
    setBookingData({
      ...res.data,
      createdAt: new Date(res.data.createdAt).toLocaleString(),
    });

  } catch (err) {
    toast.error("Booking failed");
    console.error("[BOOKING ERROR]:", err);
  }
};

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
          {bookingData ? "Booking Summary" : "Reserve a Parking Spot"}
        </h2>

        {bookingData ? (
          <BookingSummary booking={bookingData} />
        ) : (
          <BookingForm onSubmit={handleBookingSubmit} />
        )}
      </div>
    </div>
  );
};

export default Booking;
