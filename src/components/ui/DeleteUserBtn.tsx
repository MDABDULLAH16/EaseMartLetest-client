"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiTrash2 } from "react-icons/fi";
import UserDelete from "@/utils/actions/UserDelete";

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    setLoading(true); // Start loading

    try {
      const res= await UserDelete(userId);
      toast.success(res.message);
      // Redirect or update UI after deletion
      router.push("/admin/userManage");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to delete User.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <button
          onClick={handleDelete}
          disabled={loading}
    className="px-3 py-2 bg-red-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-red-600 transition"
   >
    <FiTrash2 /> Delete {loading ? "Deleting..." : "Delete"}
   </button>
  );
};
 {/* Delete Button */}

export default DeleteUserButton;