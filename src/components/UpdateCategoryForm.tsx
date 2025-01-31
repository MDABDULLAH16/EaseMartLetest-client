"use client";
import { TCategory } from "@/types/TCategory";
import UpdateCategory from "@/utils/actions/UpdateCategory";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // Import useRouter

const UpdateCategoryForm = ({ category }: { category: TCategory }) => {
  const router = useRouter(); // Initialize router

  const [formData, setFormData] = useState({
    name: category.name || "",
    description: category.description || "",
    image: category.image || "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category._id) {
      toast.error("Category ID is missing.");
      return;
    }

    try {
      const res = await UpdateCategory(category._id, formData);
      toast.success(res?.message || "Category updated successfully!");
      router.push("/admin/categoryManagement");
      // Redirect to the category management page
      //   router.push("/categoryManagement"); // Change to your category management route
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error updating category:", err.message);
      toast.error(err.message || "Failed to update category.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Update Category
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
          className="w-full py-2 px-4 bg-indigo-400 text-white font-semibold rounded-lg shadow-md hover:bg-accent transition duration-200"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
