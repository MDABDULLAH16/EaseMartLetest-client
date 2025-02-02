"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/EaseMart.png";

import { clearUserInfo, selectUserInfo } from "@/redux/features/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const user = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts on the client
  }, []);

  const handleLogOut = async () => {
    // await signOut({ redirect: false, callbackUrl: "/login" });
    dispatch(clearUserInfo());
     // Clear the auth token cookie
     Cookies.remove("authToken");

     // Clear user info from localStorage
     localStorage.removeItem("userInfo");
 
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white w-[90%]: shadow-md dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo.src || "/fallback-logo.png"}
                alt="EaseMart"
                width={50}
                height={50}
                className="w-12 h-12 rounded-full"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/product" className="nav-link">Products</Link>
            
            <Link href="/about" className="nav-link">About Us</Link>
            {isClient && user?.role === "admin" ? (
              <Link href="/admin" className="nav-link">Admin</Link>
            ) : (
                <>
                  <Link href="/cart" className="nav-link block">Cart</Link>
                  <Link href="/dashboard" className="nav-link">Dashboard</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 dark:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"}
                />
              </svg>
            </button>
          </div>

          {/* User Profile & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {isClient && user ? (
              <>
                <span className="text-gray-800 dark:text-white">{user?.name}</span>
                <button onClick={handleLogOut} className="btn-red">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden space-y-2 mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <Link href="/" className="nav-link block">Home</Link>
            <Link href="/product" className="nav-link block">Products</Link>
   
            <Link href="/about" className="nav-link block">About Us</Link>
            {isClient && user?.role === "admin" ? (
              <Link href="/admin" className="nav-link">Admin</Link>
            ) : (
                <>
                  <Link href="/cart" className="nav-link block">Cart</Link>
                  <Link href="/dashboard" className="nav-link">Dashboard</Link>
              </>
            )}
            {isClient && user ? (
              <>
                <span className="text-gray-800 dark:text-white">{user?.name}</span>
                <button onClick={handleLogOut} className="btn-red w-full">
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary w-full">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;