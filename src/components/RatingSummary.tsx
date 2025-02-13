import React from "react";

interface RatingSummaryProps {
  ratings: { stars: number; percentage: number }[];
  totalRatings: number;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({
  ratings,
  totalRatings,
}) => {
  return (
    <div className="lg:col-span-2 hidden lg:flex flex-col space-y-4">
      <div className="flex items-center">
        <span className="text-yellow-400 text-xl">★★★★★</span>
        <p className="ml-2 text-sm font-medium text-gray-900">
          {totalRatings} out of {totalRatings}
        </p>
      </div>
      <p className="text-sm font-medium text-gray-500">
        {totalRatings} global ratings
      </p>
      {ratings.map((rating) => (
        <div key={rating.stars} className="flex items-center">
          <span className="text-sm font-medium text-blue-600 hover:underline shrink-0">
            {rating.stars} star
          </span>
          <div className="w-3/4 h-4 mx-2 bg-gray-200 rounded">
            <div
              className="h-4 bg-yellow-400 rounded"
              style={{ width: `${rating.percentage}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {rating.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default RatingSummary;
