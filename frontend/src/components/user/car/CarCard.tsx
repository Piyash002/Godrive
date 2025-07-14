/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TCar } from "@/types/types";
import { Link } from "react-router-dom";
interface CarCardProps {
  car: TCar & { _id: string };
}

export const CarCard = ({ car }: CarCardProps) => {
  const mainImage = car.images.find((img: any) => img.isMain)?.url || "/default.jpg";

  return (
       <div className="space-y-4 ">
      <Link to={`/booking/${car._id}`}>
    <div className="rounded-lg shadow-sm hover:shadow-md transition flex flex-col lg:flex-row justify-between lg:items-center sm:items-start   border  overflow-hidden   border-gray-300 dark:border-slate-400 dark:bg-gray-900  ">
      {/* Image Section - small on desktop */}
     <div className="w-full lg:w-2/4    lg:h-full sm:h/">

   <div className="relativ">
  <p className="absolute top-0 right-0 bg-[#2E1065]
  text-sm text-white px-2 py-1 rounded">
    {car.available
      ? <span className="font-semibold">Available</span>
      : <span className="text-red-800">Not Available</span>
    }
  </p>
 <div className="w-full lg:h-full h-full ">
   <img
    src={mainImage}
    alt={car.name}
    className="w-full h-52  object-cover"
  />
 </div>
</div>
     </div>
      {/* Text Section */}
      <div className="w-full lg:w-2/4 lg:p-4 p-2 flex flex-col justify-between ">
        <div className="space-y-1  flex lg:flex-col flex-row ">
        <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{car.name}</h2>
          <p className="text-sm text-gray-500 dark:text-white">
            {car.type} • {car.modelYear}
          </p>
          <p className="text-sm text-gray-500 dark:text-white">
            {car.features}
          </p>
          <p className="text-sm text-gray-500 dark:text-white">Brand: {car.brand}</p>
        </div>
         <div className="fle-1">
        <div className="flex justify-between items-center mt-4">
      <p className="text-yellow-500 text-sm font-medium">⭐ {car.rating}</p>
          </div>
          </div>
       </div>
      </div>
      {/* price */}
      <div className="lg:w-1/4 lg:p-4 px-8 py-2">
     <div className="text-end">
       <span className="text-[#2E1065] dark:text-white">BDT</span>
      <p className="text-lg font-bold text-[#2E1065] dark:text-white w-full flex justify-end">
        {car.pricePerDay.toLocaleString()}/ day
      </p>
     </div>
      </div>
      <div>
      </div>
    </div>

</Link>
      </ div>
  );
};
