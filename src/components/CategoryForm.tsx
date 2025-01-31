"use client";

import CategoryCreate from "@/utils/actions/CategoryCreate";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const router = useRouter(); // Initialize Next.js router
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await CategoryCreate(formData);
      toast.success(res?.message || "Category created successfully!");

      // Redirect to Category Management after success
      router.push("/admin/categoryManagement");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Failed to create category. Try again.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create a New Category
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
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-800"
            placeholder="Enter category name"
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
            placeholder="Enter category description"
            rows={4}
          />
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
            placeholder="Enter image URL"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-200 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
