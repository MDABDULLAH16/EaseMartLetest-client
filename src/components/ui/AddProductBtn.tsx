import Link from 'next/link';
import React from 'react';

const AddProductBtn = () => {
    return (
        <div>
      <Link
        href="/admin/productManagement/addProduct"
        className="w-full py-3 bg-gradient-to-r p-4 from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
      >
       Create Product
      </Link>
    </div>
    );
};

export default AddProductBtn;