"use client";
import Image from "next/image";
import Link from "next/link";

import logoDark from "../../assets/EaseMart-darkMode1.png";

import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { RootState } from "@/redux/store";
import { Moon, Sun } from "lucide-react";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('darkMode') || 'false');
    }
    return false;
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode])
  const handleDarkMode=()=>{
    setDarkMode(!darkMode);
  }
  ////////////////////////////
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts on the client
  }, []);

  // const handleLogOut = async () => {
  //   // await signOut({ redirect: false, callbackUrl: "/login" });
  //   dispatch(clearUserInfo());
  //   // Clear the auth token cookie
  //   Cookies.remove("authToken");

  //   // Clear user info from localStorage
  //   localStorage.removeItem("userInfo");

  //   router.push("/login");
  //   router.refresh();
  // };

  const allCartItems = useSelector((state: RootState) => state.cart.items);
  const cartItems = allCartItems.filter((item) => item.userId === user?._id);
  const item = cartItems.length;

  return (
    <nav  style={{ zIndex: 1000000 }}  className="bg-white dark:text-white sticky top-0 z-1000000 w-full shadow-md dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
           {darkMode?  <Link href="/">
              <Image
                src={logoDark.src || "/fallback-logo.png"}
                alt="EaseMart"
                width={100}
                height={100}
                className="w-30 h-30  p-4 text-white"
                priority
              />
            </Link>:  <Link href="/">
              <Image
                src={logoDark.src || "/fallback-logo.png"}
                alt="EaseMart"
                width={100}
                height={100}
                className="w-30 h-30  p-4 text-white"
                priority
              />
            </Link>}
          </div>

          {/* Desktop Menu */}
          <div className="hidden dark:text-white md:flex space-x-6">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/product" className="nav-link">
              Products
            </Link>

            <Link href="/contact" className="nav-link">
              Contact Us
            </Link>
            {isClient && user?.role === "admin" ? (
              <Link href="/admin" className="nav-link">
                Admin
              </Link>
            ) : (
              <>
                <Link href="/dashboard/cart" className="nav-link block">
                  <div className="relative  rounded-lg">
                    <span className="font-bold ml-2">Cart</span>
                    <div className="px-1 py-0.5 bg-teal-500 min-w-5 rounded-full text-center text-white text-xs absolute -top-4 -end-1 translate-x-1/4 text-nowrap">
                      <div className="absolute top-0 start-0 rounded-full -z-10 animate-ping bg-teal-200 w-full h-full"></div>
                      {item}
                    </div>
                  </div>
                </Link>
              </>
            )}
            {user?.role === "user" ? (
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : (
              ""
            )}
             <button onClick={handleDarkMode}  className="text-black dark:text-white">
           {darkMode ? <Sun></Sun> :<Moon/>}
        </button>
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
                  d={
                    menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h8m-8 6h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* User Profile & Logout */}
          <div className="hidden md:flex items-center space-x-4">
            {isClient && user ? (
              <>
                <span className="text-gray-800 font-semibold text-xl dark:text-white">
                  {user?.name}
                </span>
                {user?.role === "admin" ? (
                  <Link href={"/admin"} passHref>
                    <Image
                      src={user?.image || profile.src}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  </Link>
                ) : (
                  <Link href={"/dashboard"} passHref>
                    <Image
                      src={user?.image || profile.src}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  </Link>
                )}
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden space-y-2 mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <Link href="/" className="nav-link block">
              Home
            </Link>
            <Link href="/product" className="nav-link block">
              Products
            </Link>

            <Link href="/contact" className="nav-link block">
              Contact Us
            </Link>
            <div className="flex flex-col space-y-4">
            {isClient && user?.role === "admin" ? (
              <Link href="/admin" className="nav-link">
                Admin
              </Link>
            ) : (
              <>
                <Link href="/dashboard/cart" className="nav-link block">
                  <div className="badge badge-secondary">{item}</div>Cart
                </Link>
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </>
            )}<button onClick={handleDarkMode}  className="text-black dark:text-white">
           {darkMode ? <Sun></Sun> :<Moon/>}
        </button>
            </div>
            
            {isClient && user ? (
              <div className="flex items-start flex-col space-x-4">
                <span className="text-gray-800 dark:text-white">
                  {user?.name}
                </span>

                {user?.role === "admin" ? (
                  <Link href={"/admin/myProfile"} passHref>
                    <Image
                      src={user?.image || profile.src}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  </Link>
                ) : (
                  <Link href={"/dashboard/userInfo"} passHref>
                    <Image
                      src={user?.image || profile.src}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                      width={32}
                      height={32}
                    />
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
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
