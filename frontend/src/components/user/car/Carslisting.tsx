// import type { TCar } from "@/types/types";
// import { CarCard } from "./CarCard";
// import { useState } from "react";

// export const CarListPage = () => {
//   const [typeFilter, setTypeFilter] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const carsPerPage = 6;

//   // Filter
//   let filteredCars: (TCar & { id: string })[] = allCars;
//   if (typeFilter) {
//     filteredCars = filteredCars.filter((car) => car.type === typeFilter);
//   }

//   // Sort
//   if (sortOption === "price_asc") {
//     filteredCars = [...filteredCars].sort((a, b) => a.pricePerDay - b.pricePerDay);
//   } else if (sortOption === "price_desc") {
//     filteredCars = [...filteredCars].sort((a, b) => b.pricePerDay - a.pricePerDay);
//   } else if (sortOption === "rating") {
//     filteredCars = [...filteredCars].sort((a, b) => b.rating - a.rating);
//   }

//   // Pagination
//   const totalPages = Math.ceil(filteredCars.length / carsPerPage);
//   const currentCars = filteredCars.slice(
//     (currentPage - 1) * carsPerPage,
//     currentPage * carsPerPage
//   );

//   return (
//     <div className="max-w-7xl mx-auto p-4">
//       {/* Filter + Sort */}
//       <div className="flex flex-wrap gap-4 mb-4">
//         <select
//           onChange={(e) => {
//             setTypeFilter(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="p-2 border rounded"
//         >
//           <option value="">All Types</option>
//           <option value="SUV">SUV</option>
//           <option value="Sedan">Sedan</option>
//           <option value="Hatchback">Hatchback</option>
//           <option value="Hybrid">Hybrid</option>
//           <option value="Electric">Electric</option>
//           <option value="Luxury">Luxury</option>
//           <option value="Convertible">Convertible</option>
//           <option value="Truck">Truck</option>
//         </select>

//         <select
//           onChange={(e) => {
//             setSortOption(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="p-2 border rounded"
//         >
//           <option value="">Sort by</option>
//           <option value="price_asc">Price: Low → High</option>
//           <option value="price_desc">Price: High → Low</option>
//           <option value="rating">Rating: High → Low</option>
//         </select>
//       </div>

//       {/* Car Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {currentCars.map((car) => (
//           <CarCard key={car.id} car={car} />
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center mt-6 gap-2 flex-wrap">
//         {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
//           <button
//             key={num}
//             onClick={() => setCurrentPage(num)}
//             className={`px-4 py-2 border rounded ${
//               currentPage === num ? "bg-black text-white" : "hover:bg-gray-200"
//             }`}
//           >
//             {num}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
