"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CategoryDelete from "@/utils/actions/CategoryDelete";
import { useRouter } from "next/navigation";

const DeleteButton = ({ categoryId }: { categoryId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setLoading(true); // Start loading

    try {
      await CategoryDelete(categoryId);
      toast.success("Category deleted successfully!");
      // Redirect or update UI after deletion
      router.push("/admin/categoryManagement");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`px-4 py-2 ${
        loading ? "bg-gray-500" : "bg-blue-500"
      } text-white rounded hover:bg-red-600`}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;