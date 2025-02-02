import Link from "next/link";
import React from "react";
import { FaHome, FaHeadset } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <h1 className="text-9xl font-extrabold text-gray-800 animate-pulse mb-4">
            404
          </h1>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-red-50 rounded-full opacity-50 animate-ping"></div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for seems to have vanished into the digital
          void. Do not worry, these things happen to the best of us!
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link href='/' className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold inline-flex items-center transform transition hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <FaHome className="mr-2" />
            Return Home
          </Link>

          <button className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold inline-flex items-center transform transition hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
            <FaHeadset className="mr-2" />
            Contact Support
          </button>
        </div>

        <div className="mt-12">
          <p className="text-gray-500 text-sm">Popular destinations:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {["Products", "Services", "About Us", "Blog", "Contact"].map(
              (link, index) => (
                <button
                  key={index}
                  className="px-4 py-2 text-sm text-gray-600 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  {link}
                </button>
              )
            )}
          </div>
        </div>

        <div className="mt-16 text-sm text-gray-500">
          <p>Still can not find what you are looking for?</p>
          <div className="mt-4 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search our site..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
