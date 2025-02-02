import React from 'react';

const Stat = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-gray-100 py-10 px-4">
      {/* Stats Container */}
      <div className="stats shadow-lg rounded-lg overflow-hidden w-full max-w-6xl bg-white">
        {/* Stat Item 1 */}
        <div className="stat p-6 border-b border-gray-200 transition duration-300 hover:bg-gray-50">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current text-blue-500 animate-pulse"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-600 text-sm font-medium">Total Orders</div>
          <div className="stat-value text-3xl font-bold text-gray-900">31K</div>
          <div className="stat-desc text-gray-500 text-xs">Jan 1st - Feb 1st</div>
        </div>

        {/* Stat Item 2 */}
        <div className="stat p-6 border-b border-gray-200 transition duration-300 hover:bg-gray-50">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current text-green-500 animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-600 text-sm font-medium">New Customers</div>
          <div className="stat-value text-3xl font-bold text-gray-900">4,200</div>
          <div className="stat-desc text-green-500 text-xs">↗︎ 400 (22%)</div>
        </div>

        {/* Stat Item 3 */}
        <div className="stat p-6 transition duration-300 hover:bg-gray-50">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current text-red-500 animate-spin-slow"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-gray-600 text-sm font-medium">Abandoned Carts</div>
          <div className="stat-value text-3xl font-bold text-gray-900">1,200</div>
          <div className="stat-desc text-red-500 text-xs">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default Stat;