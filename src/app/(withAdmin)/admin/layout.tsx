"use client";
import { useState } from "react";

import AdminSidebar from "@/components/shared/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start collapsed on mobile

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-200 shadow-lg transition-all duration-300 z-50
          ${isSidebarOpen ? "w-[250px] md:w-[20%]" : "w-[60px] md:w-[50px]"} 
          overflow-hidden`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <button
            className=" p-2 rounded"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d={
                  isSidebarOpen
                    ? "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                    : "M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z"
                }
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        {isSidebarOpen && (
          <div className="h-full flex flex-col transition-all duration-300">
            <AdminSidebar />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 min-h-screen bg-base-200 transition-all duration-300 
          ${isSidebarOpen ? "ml-[250px] md:ml-[20%]" : "ml-[60px] md:ml-[50px]"}`}
      >
        {children}
      </div>
    </div>
  );
}