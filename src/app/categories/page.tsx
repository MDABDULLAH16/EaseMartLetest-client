import { TCategory } from "@/types/TCategory";
import React from "react";
import CategoryCardForUser from "@/components/ui/CategoryCardForUser";
import TitleSection from "@/components/shared/TitleWithHelmet";

const CategoryPage = async () => {
  try {
    // Fetch categories from backend
    const url = process.env.BACKEND_URL;
    const allCategories = await fetch(`${url}/categories`, {
      cache: "no-cache",
      next: {
        revalidate: 30,
      },
    });

    // Parse response
    const response = await allCategories.json();
    const categories = Array.isArray(response) ? response : response.data || [];

    return (
      <div className="p-6 max-w-7xl  mx-auto">
        <div className="flex justify-center">
          <TitleSection optional={"Categories"} />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* <AddCateButton /> */}
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {categories.map((category: TCategory) => (
              <CategoryCardForUser key={category._id} category={category} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No categories available.
          </p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load categories. Please try again later.
        </p>
      </div>
    );
  }
};

export default CategoryPage;
