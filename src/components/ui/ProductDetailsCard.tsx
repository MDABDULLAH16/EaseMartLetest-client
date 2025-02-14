"use client";
import { addToCart } from "@/redux/features/cartSlice";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@/types/TProducts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteProductButton from "./DeleteProduct";
import ReviewForm from "../ReviewForm";
// import ReviewCardPDetails from "./ReviewCardPDetails";
import { TReview } from "@/types/TReviews";
import ReviewCardPDetails from "./ReviewCardPDetails";
// import ProductReviewPage from "../ProductReview";

const ProductDetailsCard = ({
  product,
  reviews,
}: {
  product: TProduct;
  reviews: TReview[];
}) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUserInfo);

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (!product._id) {
      toast.error("Product ID is missing!");
      return;
    }

    if (product.stockQuantity && product.stockQuantity < 1) {
      toast.error("Out of stock!");
      return;
    }

    if (!user?._id) {
      toast.error("Please log in to add products to your cart.");
      return;
    }

    // Dispatch the addToCart action with the product and userId
    dispatch(addToCart({ product, userId: user._id }));
  };

  return (
    <div className="max-w-full mx-auto m-4 p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            width={500}
            height={500}
            src={
              product.image ||
              "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
            }
            alt={product.name}
            className="rounded-lg shadow-lg max-h-96 w-full object-cover"
          />
        </div>
        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-gray-700 mb-4">
            ${product.price}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Available Stock:{" "}
            <span className="font-medium">{product.stockQuantity}</span>
          </p>
          {/* <p className="text-sm text-gray-600 mb-2">
            Category: <span className="font-medium">{}</span>
          </p> */}
          <p className="text-gray-700 text-md mt-4">{product.description}</p>
          {/* Admin Actions or Add to Cart Button */}
          {user?.role === "admin" ? (
            <div className="flex flex-col text-center">
              {product._id && (
                <DeleteProductButton
                  key={product._id}
                  productId={product._id}
                />
              )}
              <Link
                href={`/admin/productManagement/${product._id}`}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
              >
                Update the Product
              </Link>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-md"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
      <div className="mt-10 space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Ratings and Reviews of {product.name}
        </h2>
        {/* ReviewsMapping */}
        <div className="space-y-2">
          {reviews.map((review) => (
            <ReviewCardPDetails reviews={review} key={review.description} />
          ))}
        </div>
        {/* <ReviewCardPDetails reviews={reviews} /> */}
        <div className="py-4">
          <ReviewForm key={product._id} productId={product._id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
