// pages/admin/update-product/[id].tsx
"use client";
import React, { useState,  } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


import { TProduct } from "@/types/TProducts";
import UpdateProduct from "@/utils/actions/UpdateProduct";

// Component to handle updating product
const ProductUpdateForm = ({ product }: { product: TProduct }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: product.name || "",
    description: product.description || "",
    price: product.price || 0,
    stockQuantity: product.stockQuantity || 5,
    
    image: product.image || "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      setLoading(true);
      if (!product._id) {
          toast.error('Product not found')
          return
        
      }
      const payload: TProduct = formData || null;

    try {
      const res = await UpdateProduct(product._id, payload);
      toast.success(res?.message || "Product updated successfully!");
      router.push("/admin/productManagement");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Failed to update product. Try again.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Update Product: {product.name}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product name"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product description"
            rows={4}
            required
          />
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product price"
            required
          />
        </div>

        {/* Stock Quantity Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="stockQuantity">
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter stock quantity"
            required
          />
        </div>

        {/* Category Dropdown */}
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category"> */}
            {/* Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required */}
          {/* > */}
            {/* <option value="">Select a category</option> */}
            {/* Assuming `categories` array is passed or you fetch it separately */}
            {/* {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))} */}
          {/* </select>
        </div> */}

        {/* Image URL Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter product image URL"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-200 disabled:opacity-50"
          disabled={loading}
          aria-label="Submit product form"
        >
          {loading ? "Updating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

// // Fetch product data on the server side
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id: string };

//   try {
//     // Assuming you have an API route to get a single product
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
//     const product = await res.json();

//     if (!product) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: { product }, // Pass the product data to the page component
//     };
//   } catch (err) {
//     console.error("Error fetching product:", err);
//     return {
//       notFound: true,
//     };
//   }
// };

export default ProductUpdateForm;
