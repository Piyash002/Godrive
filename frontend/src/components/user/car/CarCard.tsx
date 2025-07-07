/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TCar } from "@/types/types";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: TCar & { id: string };
}

export const CarCard = ({ car }: CarCardProps) => {
  const mainImage = car.images.find((img: any) => img.isMain)?.url || "/default.jpg";

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col lg:flex-row lg:gap-x-6 border border-gray-200 overflow-hidden">
      {/* Image Section - small on desktop */}
      <Link to={`/cars/${car.id}`} className="w-full lg:w-1/4 h-48 lg:h-auto">
        <img
          src={mainImage}
          alt={car.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Text Section */}
      <div className="w-full lg:w-3/4 p-4 flex flex-col justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-800">{car.name}</h2>
          <p className="text-sm text-gray-600">
            {car.type} • {car.modelYear}
          </p>
          <p className="text-sm text-gray-500">Brand: {car.brand}</p>
          <p className="text-lg font-bold text-blue-600">
            ৳{car.pricePerDay.toLocaleString()} / day
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-yellow-500 text-sm font-medium">⭐ {car.rating}</p>
          <Link
            to={`/cars/${car.id}`}
            className="text-sm px-4 py-2 bg-amber-500 text-white rounded hover:bg-blue-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};
