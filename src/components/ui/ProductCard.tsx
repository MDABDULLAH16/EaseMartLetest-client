"use client";

import Image from "next/image";
import Link from "next/link";
import { TProduct } from "@/types/TProducts";


const ProductCard = ({ product }: { product: TProduct }) => {
  // const handleAddToCart = () => {};
 
  return (
    <div className=" max-w-sm mx-auto dark:text-white  w-full bg-white dark:bg-[#383838] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="relative  overflow-hidden  p-4 ">
        <Image
          src={
            product.image ||
            "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
          }
          alt={product.name}
          width={300}
          height={300}
          className="w-full sm:h-36 md:h-36 lg:h-36 object-cover rounded-t-lg"
        />

        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          10% OFF
        </div>
      </div>

      {/* Content Section */}
      <div className=" p-2 flex flex-col">
        <h3 className=" dark:text-white text-gray-800 truncate">
          {product.name}
        </h3>
       
        <div className="flex items-center justify-between">
          <span className="font-medium text-blue-600">
          ৳ {product.price.toFixed(2)} BDT
          </span>
        </div>

        {/* See Details Button */}
        <Link href={`/product/${product._id}`} className="w-full">
          <button
            className="w-full text-sm p-1  bg-blue-600 text-white rounded-md font-semibold flex items-center justify-center hover:bg-blue-700 transition duration-300"
            aria-label="See Details"
          >
            <span>See Details</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
