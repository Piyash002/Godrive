const HeroBanner = () => {
  return (
<section
  className="relative dark:text-white text-black lg:py-20 py-10 px-6 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('reflection-people-glass-female-customer-modern-stylish-bearded-businessman-automobile-saloon.jpg')", backgroundAttachment:"fixed" }}
>
  {/* Optional dark overlay for better text contrast */}
  <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0" />

  {/* Content on top of background */}
  <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
    <h1 className="lg:text-5xl sm:text-4xl text-3xl font-bold">
      Book Your Ride in Seconds
    </h1>
    <p className="text-lg sm:text-xl dark:text-white/90 text-black/90">
      Choose location and date — we’ll handle the rest.
    </p>

    <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
      Book Now
    </button>

    {/* Search Form */}
    <div className="bg-white/90 text-black backdrop-blur-md rounded-lg p-6 lg:mt-8 mt-4 max-w-4xl mx-auto shadow-lg">
      <div className="grid gap-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Pickup Location"
          className="px-4 py-3 rounded border w-full"
        />
        <input
          type="date"
          className="px-4 py-3 rounded border w-full"
        />
        <input
          type="date"
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
