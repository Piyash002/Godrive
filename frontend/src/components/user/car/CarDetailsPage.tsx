// import { useParams } from "react-router-dom";
// import { cars } from "@/data/carData";

// export const CarDetailsPage = () => {
//   const { id } = useParams();
//   const car = cars.find((c) => c.id === id);

//   if (!car) return <p>Car not found.</p>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <img src={car.images[0].url} alt={car.name} className="w-full rounded-xl mb-6" />
//       <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
//       <p className="text-gray-600 mb-1">Brand: {car.brand}</p>
//       <p className="text-gray-600 mb-1">Type: {car.type}</p>
//       <p className="text-gray-600 mb-1">Year: {car.modelYear}</p>
//       <p className="text-lg text-green-700 font-semibold mb-2">৳{car.pricePerDay}/day</p>
//       <p className="mb-4">{car.description}</p>

//       {car.features?.length && (
//         <div className="mb-4">
//           <h3 className="font-bold mb-1">Features:</h3>
//           <ul className="list-disc list-inside text-sm text-gray-700">
//             {car.features.map((f, i) => (
//               <li key={i}>{f}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mt-4">
//         <h3 className="font-bold mb-1">Add-Ons:</h3>
//         <ul className="list-disc list-inside text-sm">
//           {Object.entries(car.addOns).map(([key, value]) => (
//             <li key={key}>
//               {key}: {value ? "✅" : "❌"}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
