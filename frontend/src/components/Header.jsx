import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useOnlineStatus from "../hooks/useOnlineStatus";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  const navLink = (label, path) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={`relative group text-lg font-medium px-2 py-1 transition duration-200 ${
          isActive ? "text-green-100" : "text-white hover:text-green-100"
        }`}
      >
        {label}
        {!isActive && (
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-green-100 transition-all duration-300 group-hover:w-full"></span>
        )}
        {isActive && (
          <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-green-100"></span>
        )}
      </Link>
    );
  };

  return (
    <>
      {!isOnline && (
        <div className="bg-red-100 text-red-800 text-center py-2 text-sm font-medium shadow-inner">
          ⚠️ You are currently <strong>offline</strong>. Some features may not work.
        </div>
      )}

      <header className="bg-gradient-to-r from-green-700 to-green-600 text-white px-8 py-4 flex justify-between items-center shadow-lg sticky top-0 z-50">
        {/* Left Nav */}
        <div className="flex gap-6 items-center">
          {navLink("Home", "/")}
          {navLink("Booking", "/booking")}
          {navLink("Ride", "/ride")}
          {navLink("Subscription", "/subscription")}
          {loggedIn && navLink("Logs", "/admin/logs")}
        </div>

        {/* Right Buttons */}
        <div className="flex gap-3 items-center">
          <Link
            to="/offline-booking"
            className="bg-white text-green-700 border border-green-300 hover:bg-green-100 shadow-sm px-4 py-2 rounded text-sm font-semibold transition"
          >
            Offline Access
          </Link>

          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-400 shadow-sm px-4 py-2 rounded text-sm font-semibold transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-green-700 border border-green-300 hover:bg-green-100 shadow-sm px-4 py-2 rounded text-sm font-semibold transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-400 text-white shadow-sm px-4 py-2 rounded text-sm font-semibold transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
