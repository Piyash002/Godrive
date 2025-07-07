const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
          Book Your Ride in Seconds
        </h1>
        <p className="text-lg sm:text-xl text-white/90">
          Choose location and date — we’ll handle the rest.
        </p>

        {/* Call to Action Button */}
        <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
          Book Now
        </button>

        {/* Search Form */}
        <div className="bg-white/90 text-black backdrop-blur-md rounded-lg p-6 mt-8 max-w-4xl mx-auto shadow-lg">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Pickup Location"
              className="px-4 py-3 rounded border w-full"
            />
            <input
              type="date"
              placeholder="Pickup Date"
              className="px-4 py-3 rounded border w-full"
            />
            <input
              type="date"
              placeholder="Dropoff Date"
              className="px-4 py-3 rounded border w-full"
            />
          </div>
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded transition">
            🔍 Check Availability
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
