/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useGetallBrandQuery } from "@/redux/features/cars/brand.api";

type Props = {
  onFilterChange: (filters: { brand?: string; price?: string; ratings?: string }) => void;
};

const MobileFilter = ({ onFilterChange }: Props) => {
  const { data: response } = useGetallBrandQuery(undefined);
  const brands = response?.data ?? [];
  const [isModalOpen, setModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ [e.target.name]: e.target.value });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as Element).id === "backdrop") {
      setModalOpen(false);
    }
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="text-black dark:text-white px-4 py-2 rounded flex items-center gap-2"
      >
        <MdOutlineFilterList size={20} />
        Filter
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="backdrop"
          onClick={handleBackdropClick}
          className="fixed inset-0  bg-opacity-40 z-40"
        >
          {/* Slide-in Panel */}
          <div
            className="absolute top-[64px] left-0 h-[calc(100%-64px)] w-[90vw] max-w-xs bg-white dark:bg-black text-black dark:text-white shadow-lg z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-xl font-bold mb-6">Filter Options</h2>

            <div className="space-y-4">
              {/* Brand Dropdown */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Brand</label>
                <div className="w-full overflow-x-hidden">
                  <select
                    name="brand"
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand: any) => (
                      <option key={brand._id} value={brand.brand} title={brand.brand}>
                        {brand.brand.length > 30 ? brand.brand.slice(0, 30) + "..." : brand.brand}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rating Dropdown */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                  name="ratings"
                  onChange={handleChange}
                  className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                >
                  <option value="">Any Rating</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileFilter;
