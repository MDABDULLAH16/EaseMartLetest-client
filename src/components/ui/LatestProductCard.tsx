'use client'
import { useState } from "react";
import Image from "next/image";
import { TProduct } from "@/types/TProducts";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { toast } from "react-toastify";
import { addToCart } from "@/redux/features/cartSlice";

const LatestProductCard = ({ products }: { products: TProduct[] }) => {
  //handle add to cart
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserInfo);

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (products.some(product => !product._id)) {
      toast.error("Product ID is missing!");
      return;
    }

    if (products.some(product => product.stockQuantity && product.stockQuantity < 1)) {
      toast.error("Out of stock!");
      return;
    }

    if (!user?._id) {
      toast.error("Please log in to add products to your cart.");
      return;
    }

    // Dispatch the addToCart action with the product and userId
    products.forEach(product => {
      dispatch(addToCart({ product, userId: user._id }));
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Calculate pagination indexes
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="p-4">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="max-w-sm w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-2"
          >
            <div className="relative w-full h-56">
              <Image
                src={
                  product.image ||
                  "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
                }
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-2xl"
              />
              <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full shadow-md">
                NEW
              </div>
            </div>
            <div className="p-4 pt-2">
              <h3 className="text-xl font-bold text-gray-800 truncate">{product.name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-indigo-600">${product.price.toFixed(2)}</span>
              </div>
              <button
              onClick={handleAddToCart}  className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-200 text-blue-700 rounded-md hover:bg-blue-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LatestProductCard;
