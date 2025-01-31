"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ProductDelete from "@/utils/actions/ProductDelete";

const DeleteProductButton = ({ productId }: { productId: string }) => {
  console.log('id for dle product',productId);
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this Product?")) return;

    setLoading(true); // Start loading

    try {
      const res = await ProductDelete(productId);
     
      
      toast.success(res.message);
      // Redirect or update UI after deletion
      router.push("/admin/productManagement");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to delete Category.");
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
      } text-white rounded hover:bg-red-500`}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteProductButton;