import type { Metadata } from "next";
import UserSidebar from "../../../components/shared/UserSidebar";

export const metadata: Metadata = {
  title: "EaseMart User Dashboard",
  description: "Manage apps here",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen !w-full flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <div className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 h-screen overflow-y-hidden z-10">
        <UserSidebar />
      </div>
      {/* Main Content Area */}
      <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
