'use server'
const CategoryDelete = async (id: string) => {
  try {
    const url = process.env.BACKEND_URL;
    if (!url) {
      throw new Error("BACKEND_URL is not defined in environment variables");
    }

    const res = await fetch(`${url}/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorText = await res.text(); // Get error details
      throw new Error(`HTTP Error ${res.status}: ${errorText}`);
    }

    const result = await res.json();
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting category:", error.message);
    throw new Error(error.message);
  }
};

export default CategoryDelete;
