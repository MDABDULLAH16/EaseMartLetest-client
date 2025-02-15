import ProductForm from "@/components/ProductForm";


const AddProductPage = async () => {
  const url = process.env.BACKEND_URL;

  try {
    const res = await fetch(`${url}/categories`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const responseData = await res.json();

    // Ensure categories is an array
    const categories = Array.isArray(responseData)
      ? responseData
      : responseData.data || [];

    return (
      <div>
        {/* <h1 className="text-2xl font-bold mb-4">Add New Product</h1> */}
        <ProductForm categories={categories} />
      </div>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return <p>Error loading categories. Please try again later.</p>;
  }
};

export default AddProductPage;