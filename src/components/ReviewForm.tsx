/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { TReview } from "@/types/TReviews";
import CreateReviews from "@/utils/actions/CreateReview";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface ReviewFormProps {
  productId?: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const user = useSelector(selectUserInfo);

  const [star, setStar] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!user?.name || !productId) {
      toast.error("User or Product information is missing.");
      return;
    }
    if (!star) {
      toast.error("Please select a star rating.");
      return;
    }
    if (!review.trim()) {
      toast.error("Review cannot be empty.");
      return;
    }

    const reviewData: TReview = {
      userName: user.name,
      productId,
      star,
      description: review,
      createdAt: "",
      _id: "",
    };

    console.log("Submitted Review:", reviewData);

    try {
      const res = await CreateReviews(reviewData);
      console.log("Review Response:", res);
      if (res.success === true) {
        toast.success("Review posted successfully!");
      } else {
        toast.error("Failed to post review. Try again.");
      }
      setStar(null);
      setReview("");
    } catch (err: any) {
      toast.error("Failed to post review. Try again.");
      console.error("Review Error:", err.message);
    }
  };

  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-md max-w-4xl sm:p-6 grid grid-cols-1 lg:grid-cols-6 gap-6">
      <div className="lg:col-span-4 col-span-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Write a review
          </h2>

          {/* Stars Selection */}
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="star"
                  value={s}
                  checked={s === star}
                  onChange={(e) => setStar(Number(e.target.value))}
                  className="hidden"
                />
                <span
                  className={`cursor-pointer text-2xl ${
                    s <= (star || 0) ? "text-orange-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              </label>
            ))}
          </div>

          <textarea
            id="review"
            name="review"
            rows={4}
            required
            className="block w-full p-3 text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>

          <div className="text-right py-4">
            <button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-3"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
      {/* <RatingSummary key={} ratings={3}totalRatings={12} /> */}
    </div>
  );
};

export default ReviewForm;
