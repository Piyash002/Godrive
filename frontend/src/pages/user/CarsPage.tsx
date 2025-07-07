/* eslint-disable @typescript-eslint/no-explicit-any */
import { CarCard } from "@/components/user/car/CarCard";
import { useGetallCarsQuery } from "@/redux/features/cars/cars.api";
import { useState } from "react";


const CarsPage = () => {
     const [queryParams] = useState({
    search: "",
    type: "",
    price: "",
    ratings: "",
    producatName:'',
    page: "1",     
    limit: "10", 
  });
    const searchParams = new URLSearchParams(queryParams).toString();
    const { data: response} = useGetallCarsQuery(searchParams);
     const cars = response?.data?.result??[]
     console.log(cars)
    return (
        <div>
           <div className="max-w-7xl mx-auto p-4">
  <div className="flex flex-col lg:flex-row gap-6">
       <div className="hidden lg:block w-full lg:w-1/3">
      <div className="bg-white p-4 shadow rounded">
        <h3 className="text-lg font-bold mb-2">Filter Cars</h3>
        {/* Filter form goes here */}
      </div>
    </div>
    {/* LEFT — Card List (takes 2/3 space) */}
    <div className="w-full lg:w-2/3 space-y-6">
      {cars.map((car: any) => (
        <CarCard key={car._id} car={car} />
      ))}
    </div>

    {/* RIGHT — Filter Sidebar (placeholder now) */}
 

  </div>
</div>

        </div>
    );
};

export default CarsPage ;