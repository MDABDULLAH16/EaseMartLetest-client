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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <div className="md:w-[20%] bg-white dark:bg-gray-900 shadow-lg">
        <UserSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
}
