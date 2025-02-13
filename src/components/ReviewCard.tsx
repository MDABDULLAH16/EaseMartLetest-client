import React from "react";
import { TReview } from "@/types/TReviews";

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      {/* Card Content */}
      <div className="p-6 text-center">
        {/* User Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {review.userName}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {review.description}
        </p>

        {/* Star Rating */}
        <div className="flex items-center justify-center space-x-1 mb-4">
          {Array.from({ length: 5 }, (_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 fill-current ${
                index < review.star ? "text-yellow-500" : "text-gray-300"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
