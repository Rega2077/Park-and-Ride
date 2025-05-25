import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const OfflineBooking = () => {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("latestBooking");
    if (data) {
      setBooking(JSON.parse(data));
    }
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-600 px-4">
        <p>No booking data available. Please book a slot online before using offline mode.</p>
      </div>
    );
  }

  const qrData = `
Booking ID: ${booking.bookingId}
Location: ${booking.location}
Date: ${booking.date}
Time: ${booking.time}
Duration: ${booking.duration}h
Slot: ${booking.slotAssigned}
Status: ${booking.status || "pending"}
  `;

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white rounded shadow-lg p-6 text-green-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Offline Booking Access</h2>

        <div className="space-y-4">
          <p><strong>Location:</strong> {booking.location}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Duration:</strong> {booking.duration} hour(s)</p>
          <p><strong>Slot Assigned:</strong> {booking.slotAssigned}</p>
          <p><strong>Booking ID:</strong> {booking.bookingId}</p>
          <p><strong>Status:</strong> {booking.status || "pending"}</p>
          <p><strong>Created At:</strong> {booking.createdAt}</p>

          <div className="flex flex-col items-center mt-6">
            <p className="font-semibold mb-2">Scan this QR:</p>
            <QRCodeSVG value={qrData} size={180} fgColor="#065f46" />
            <button
              onClick={() => window.print()}
              className="mt-4 bg-green-500 hover:bg-green-400 text-white px-6 py-2 rounded font-semibold transition"
            >
              Print or Save QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineBooking;
