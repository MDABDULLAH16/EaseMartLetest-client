"use client";
import { TCategory } from "@/types/TCategory";
import React, { useState } from "react";
import CategoryCardForUser from "@/components/ui/CategoryCardForUser";
import TitleSection from "@/components/shared/TitleWithHelmet";

const CategoryPage = ({ categories }: { categories: TCategory[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Number of categories per page
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Calculate the start and end index for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the categories to display on the current page
  const currentCategories = categories.slice(startIndex, endIndex);

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-center">
        <TitleSection optional={"Categories"} />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* AddCateButton can be added here if needed */}
      </div>
      {categories.length > 0 ? (
        <div className="relative">
          {/* Button Container */}
          <div className="flex justify-between items-center mb-4">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={currentPage === 0}
              className={`px-4 py-2  bg-blue-500 text-white rounded-md shadow-md ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {"< Previous"}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1}
              className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md ${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {"Next >"}
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 overflow-hidden transition-transform duration-300">
            {currentCategories.map((category: TCategory) => (
              <CategoryCardForUser key={category._id} category={category} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No categories available.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
