"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import {
  FaUser,
  FaEnvelope,
  FaBriefcase,
  FaMapMarkerAlt,
  FaEdit,
  FaPhone,
  FaSun,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { FaMoon } from "react-icons/fa6";


interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  className?: string;
}

const UserProfile = () => {
  const user = useSelector(selectUserInfo);
  const url = process.env.BACKEND_URL;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userInfo, setData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const singleUserData = await fetch(`${url}/auth/${user?._id}`);
      const data = await singleUserData.json();
      setData(data.data);
    };
    fetchUserData();
  }, [url, user?._id]);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true); 
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode");
      if (savedDarkMode) {
        setDarkMode(savedDarkMode === "true");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode.toString());
    }
  }, [darkMode]);

  if (!isClient) return null;

  if (!userInfo || !userInfo.name || !userInfo.email) {
    return <p>No user info available.</p>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, email, image, phone = "Not provided", role, address = "Not provided", avatar } = userInfo;

  const copyToClipboard = (text: string, field: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      toast.success(`${field} copied to clipboard!`);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value, className }) => (
    <div className={`p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-100 dark:bg-blue-700 rounded-full">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-base font-medium text-gray-900 dark:text-white">{value || "Not provided"}</p>
        </div>
      </div>
      <button
        onClick={() => copyToClipboard(value, label)}
        aria-label={`Copy ${label} to clipboard`}
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FaPhone className="w-5 h-5 text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400" />
      </button>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="py-10 px-6 sm:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Dark Mode Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              {darkMode ? (
                <FaSun className="w-6 h-6 text-yellow-500" />
              ) : (
                <FaMoon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Profile Header */}
          <div className="text-center mb-10">
            <div className="relative inline-block">
              <Image
                src={image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg"
                width={144}
                height={144}
                onError={(e) => {
                  e.currentTarget.src = "/fallback-avatar.png";
                }}
              />
              <button
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors duration-200"
                title="Edit profile picture"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-gray-900 dark:text-white">
              {name}
            </h1>
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <InfoCard icon={FaUser} label="Full Name" value={name} />
            <InfoCard icon={FaEnvelope} label="Email" value={email} />
            <InfoCard icon={FaBriefcase} label="Role" value={role} />
            <InfoCard icon={FaPhone} label="Phone" value={phone} />
            <InfoCard icon={FaMapMarkerAlt} label="Address" value={address} />
          </div>

          {/* Edit Profile Button */}
          <div className="flex justify-center mt-6">
            {user?.role === "admin" ? (
              <Link href={`/admin/myProfile/${userInfo._id}`} className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                Edit Profile
              </Link>
            ) : (
              <Link href={`/dashboard/userInfo/${userInfo._id}`} className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
