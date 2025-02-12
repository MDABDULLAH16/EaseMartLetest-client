import CategoryPage from "@/components/CategoriesPage";

const CategoryPageWrapper = async () => {
  try {
    const url = process.env.BACKEND_URL;
    const allCategories = await fetch(`${url}/categories`, {
      cache: "no-cache",
      next: {
        revalidate: 30,
      },
    });

    const response = await allCategories.json();
    const categories = Array.isArray(response) ? response : response.data || [];

    return <CategoryPage categories={categories} />;
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

export default CategoryPageWrapper;
