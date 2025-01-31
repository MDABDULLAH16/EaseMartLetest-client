"use client";
import React from "react";
import { TUser } from "@/types/TUser";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import DeleteUserButton from "./ui/DeleteUserBtn";

const UserTable = ({ user }: { user: TUser[] }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Phone</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Role</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {user && user.length > 0 ? (
              user.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4">{u.name}</td>
                  <td className="py-3 px-4">{u.email}</td>
                  <td className="py-3 px-4 hidden md:table-cell">{u.phone}</td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        u.role === "admin"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    {/* Update Button */}
                    <button
                      onClick={() => router.push(`/admin/userManage/${u._id}`)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-600 transition"
                    >
                      <FiEdit2 /> Update
                    </button>

                    {/* Ensure u._id is defined before rendering DeleteUserButton */}
                    {u._id && (
                      <DeleteUserButton key={u._id} userId={u._id} />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;