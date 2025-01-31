"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CreateProduct from "@/utils/actions/CreateProduct";
import { TProduct } from "@/types/TProducts";
import { TCategory } from "@/types/TCategory";

interface ProductFormProps {
  categories: TCategory[]; // Define the prop type
}

const ProductForm: React.FC<ProductFormProps> = ({ categories }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  if (safeCategories.length === 0) {
    return <p>No categories available. Please add categories first.</p>;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate numeric fields
    const price = parseFloat(formData.price);
    const stockQuantity = parseInt(formData.stockQuantity, 10);

    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price.");
      setLoading(false);
      return;
    }

    if (isNaN(stockQuantity) || stockQuantity < 0) {
      toast.error("Please enter a valid stock quantity.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        price,
        stockQuantity,
      } as TProduct;
      // console.log('payload',payload);
      
      const res = await CreateProduct(payload);
      console.log(res);
      // Call API utility
      toast.success(res?.message || "Product created successfully!");
      router.push("/admin/productManagement"); // Redirect after success
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Failed to create product. Try again.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create a New Product
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
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
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="description"
          >
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
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="price"
          >
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
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="stockQuantity"
          >
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
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a category</option>
            {safeCategories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL Field */}
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="image"
          >
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
          {loading ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;