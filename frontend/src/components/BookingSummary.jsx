import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import API from "../services/api";

const BookingSummary = ({ booking }) => {
  const [status, setStatus] = useState(booking.status || "pending");

  useEffect(() => {
    localStorage.setItem("latestBooking", JSON.stringify(booking));
  }, [booking]);

  const handleCancel = async () => {
    try {
      const res = await API.patch(`/bookings/${booking._id}/cancel`);
      if (res.data.success) {
        setStatus("cancelled");
      }
    } catch (err) {
      console.error("Cancellation failed:", err);
      alert("Could not cancel booking.");
    }
  };

  const handleCheckIn = async () => {
    try {
      const res = await API.patch(`/bookings/${booking._id}/checkin`);
      if (res.data.success) {
        setStatus("checked-in");
      }
    } catch (err) {
      console.error("Check-in failed:", err);
      alert("Could not check-in.");
    }
  };

  const qrData = `
Booking ID: ${booking.bookingId}
Location: ${booking.location}
Date: ${booking.date}
Time: ${booking.time}
Duration: ${booking.duration}h
Slot: ${booking.slotAssigned}
Status: ${status}
  `;

  return (
    <div className="space-y-6 text-green-800">
      <div className="bg-green-100 p-4 rounded shadow-sm">
        <p><strong>Location:</strong> {booking.location}</p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
        <p><strong>Slot Assigned:</strong> {booking.slotAssigned}</p>
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <p><strong>Created At:</strong> {booking.createdAt}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 font-semibold ${
            status === "cancelled" ? "text-red-600" :
            status === "pending" ? "text-yellow-600" :
            "text-green-700"
          }`}>
            {status}
          </span>
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <p className="font-semibold">Scan this QR at entry:</p>
        <QRCodeSVG value={qrData} size={180} fgColor="#065f46" />

        <button
          onClick={() => window.print()}
          className="mt-4 bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded font-semibold transition"
        >
          Print or Save QR
        </button>

        {status === "pending" && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded font-semibold transition"
            >
              Cancel Booking
            </button>

            <button
              onClick={handleCheckIn}
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
            >
              Check In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
