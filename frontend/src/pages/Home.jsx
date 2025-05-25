const Home = () => {
  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-800 mb-4 leading-tight">
          Seamless Metro Parking & Last-Mile Ride Booking
        </h1>

        <p className="text-green-700 text-lg sm:text-xl mb-6">
          An integrated platform to pre-book metro parking, schedule last-mile rides,
          and access offline QR codes for a smooth and reliable commute.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/booking"
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded font-semibold shadow-md transition"
          >
            Book Parking
          </a>
          <a
            href="/ride"
            className="bg-white border border-green-300 text-green-700 hover:bg-green-100 px-6 py-3 rounded font-semibold shadow-md transition"
          >
            Book Ride
          </a>
          <a
            href="/offline-booking"
            className="bg-green-100 border border-green-300 text-green-800 hover:bg-green-200 px-6 py-3 rounded font-semibold shadow-md transition"
          >
            Offline Access
          </a>
        </div>

        <div className="mt-8 text-sm text-green-600">
          Built with <strong>MERN Stack</strong> + <strong>Tailwind CSS</strong> + <strong>QR Code</strong> support
        </div>
      </div>
    </div>
  );
};

export default Home;
