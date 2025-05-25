import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

const RideSummary = ({ ride }) => {
  // Save ride to localStorage for offline fallback
  useEffect(() => {
    localStorage.setItem("latestRide", JSON.stringify(ride));
  }, [ride]);

  const qrData = `
    Ride ID: ${ride.rideId}
    Type: ${ride.rideType}
    Pickup: ${ride.pickupPoint}
    Drop: ${ride.dropPoint}
    Schedule: ${ride.schedule}
  `;

  return (
    <div className="bg-green-100 p-6 rounded shadow text-green-900 space-y-4">
      <p><strong>Pickup:</strong> {ride.pickupPoint}</p>
      <p><strong>Drop:</strong> {ride.dropPoint}</p>
      <p><strong>Type:</strong> {ride.rideType}</p>
      <p><strong>Schedule:</strong> {ride.schedule}</p>
      <p><strong>Ride ID:</strong> {ride.rideId}</p>
      <p><strong>Created:</strong> {ride.createdAt}</p>

      <div className="flex flex-col items-center space-y-2 pt-4">
        <p className="font-semibold text-green-800">Scan this QR at pickup point:</p>
          <QRCodeSVG value={qrData} size={180} fgColor="#065f46" />
        <button
          onClick={() => window.print()}
          className="mt-4 bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-semibold transition"
        >
          Print or Save QR
        </button>
      </div>
    </div>
  );
};

export default RideSummary;
