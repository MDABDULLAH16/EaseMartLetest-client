"use client";

import Link from "next/link";

const AddCateButton = () => {
  return (
    <div>
      <Link
        href="/categories/addCategory"
        className="w-full py-3 bg-gradient-to-r p-4 from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
      >
        Add Category
      </Link>
    </div>
  );
};

export default AddCateButton;
