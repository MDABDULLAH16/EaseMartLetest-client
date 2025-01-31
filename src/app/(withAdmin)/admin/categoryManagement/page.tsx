import CategoryCard from "@/components/CategoryCard";
import AddCateButton from "@/components/ui/AddCateButton";
import { TCategory } from "@/types/TCategory";

const CategoryManagement = async () => {
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
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Category Management
          </h1>
  
            <AddCateButton />
        
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {categories.map((category: TCategory) => (
              <CategoryCard key={category._id} category={category} />
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

export default CategoryManagement;
