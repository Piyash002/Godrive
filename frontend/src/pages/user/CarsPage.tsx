/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/ui/Loading";
import { CarCard } from "@/components/user/car/CarCard";
import MoblieFilter from "@/components/user/filter/MoblieFilter";
import { useGetallCarsQuery } from "@/redux/features/cars/Cars.api";
import { useState } from "react";

const CarsPage = () => {
     const [queryParams, setQueryParams] = useState({
    search: "",
    type: "",
    price: "",
    ratings: "",
    producatName:'',
    page: "1",     
    limit: "10", 
  });
    const handleFilters = (filters: { brand?: string; price?: string; ratings?: string }) => {
    setQueryParams((prev) => ({ ...prev, ...filters }));
  };
//   const handleSearch = (value: string) => {
//     setQueryParams((prev) => ({ ...prev, search: value }));
//   };
//  const handlePageChange = (newPage: number) => {
//   setQueryParams((prev) => ({ ...prev, page: newPage.toString() }));
// };
    const { data: response, isLoading} = useGetallCarsQuery(queryParams);
     const cars = response?.data?.result??[]
     if (isLoading) {
    return (
   <>
   <Loading/>
   </>
  );
}
    return (
        <div>
           <div className="max-w-7xl mx-auto p-4">
  <div className="flex flex-col lg:flex-row gap-6">
       <div className="hidden lg:block w-full lg:w-1/3">
      <div className="bg-white dark:bg-black p-4 shadow rounded">
        <h3 className="text-lg font-bold mb-2">Filter Cars</h3>
        {/* Filter form goes here */}
      </div>
    </div>
       <div className=" lg:hidden lg:w-1/3">
      <div className=" bg-white dark:bg-black text-black  p-4 shadow rounded">
       <MoblieFilter onFilterChange={handleFilters}/>
        {/* Filter form goes here */}
      </div>
    </div>
    {/* LEFT — Card List (takes 2/3 space) */}
    <div className="w-full lg:w-2/3 space-y-2">
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