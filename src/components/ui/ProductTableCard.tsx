"use client";

import Image from "next/image";
import Link from "next/link";
import { TProduct } from "@/types/TProducts";

const ProductTableCard = ({ product }: { product: TProduct }) => {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
      {/* Product Image */}
      <td className="p-4">
        <div className="relative w-20 h-20">
          <Image
            src={
              product.image ||
              "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
            }
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </td>

      {/* Product Details */}
      <td className="p-4 font-medium text-gray-800">{product.name.length> 20? product.name.slice(0,20)+"...": product.name}</td>
      <td className="p-4 text-gray-600 text-sm max-w-xs truncate">
        {product.description}
      </td>
      <td className="p-4 font-semibold text-blue-600">${product.price.toFixed(2)}</td>
      <td className="p-4 text-gray-700">{product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}</td>

      {/* Actions */}
      <td className="p-4">
        <Link href={`/product/${product._id}`}>
          <button
            className=" bg-blue-600 px-2 text-white rounded-md  hover:bg-blue-700 transition duration-200"
            aria-label="See Details"
          >
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default ProductTableCard;
