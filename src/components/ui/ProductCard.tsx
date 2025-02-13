"use client";

import Image from "next/image";
import Link from "next/link";
import { TProduct } from "@/types/TProducts";

const ProductCard = ({ product }: { product: TProduct }) => {
  // const handleAddToCart = () => {};

  return (
    <div className=" max-w-sm mx-auto  w-full bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Image Section */}
      <div className="relative">
        <Image
          src={
            product.image ||
            "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
          }
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-64 object-cover rounded-t-lg"
        />

        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          10% OFF
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* See Details Button */}
        <Link href={`/product/${product._id}`} className="w-full">
          <button
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold flex items-center justify-center hover:bg-blue-700 transition duration-300"
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
