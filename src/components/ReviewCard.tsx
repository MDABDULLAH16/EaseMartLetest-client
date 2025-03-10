import React from "react";
import { TReview } from "@/types/TReviews";

const ReviewCard = ({ review }: { review: TReview }) => {
  return (
    <div className="flex flex-col  rounded-md mb-4 border-neutral-800 bg-white dark:bg-[#383838] text-black dark:text-white  p-8 shadow-sm max-w-sm mx-auto mt-4">

    {/* <!-- stars --> */}
    <div className=" flex gap-2">
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

    <p className="my-4 mb-0 text-sm  leading-relaxed tracking-wide ">
        {review.description.length > 100 ? review.description.slice(0, 130) + "..." : review.description}
    </p>


    <div className="mt-2 flex items-center gap-6 ">
       
        <div>
          <p className="leading-relaxed tracking-wide">{ review.userName}</p>
          <p className="text-xs ">Verified Buyer</p>
        </div>
    </div>


</div>)
};

export default ReviewCard;