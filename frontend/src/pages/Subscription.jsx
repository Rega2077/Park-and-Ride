import { useEffect, useState } from "react";

const Subscription = () => {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const isActive = localStorage.getItem("sub_active") === "true";
    setSubscribed(isActive);
  }, []);

  const handleSubscribe = () => {
    localStorage.setItem("sub_active", "true");
    setSubscribed(true);
  };

  const handleCancel = () => {
    localStorage.removeItem("sub_active");
    setSubscribed(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          Subscription Plan
        </h2>

        {subscribed ? (
          <div className="text-center space-y-4">
            <p className="text-green-800">✅ You have an active monthly subscription!</p>
            <button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded font-semibold transition"
            >
              Cancel Subscription
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-700">💡 Enjoy unlimited bookings for ₹499/month.</p>
            <button
              onClick={handleSubscribe}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-semibold transition"
            >
              Activate Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
