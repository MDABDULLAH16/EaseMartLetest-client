"use client";

import React, { useState, useEffect, useRef } from "react";
import ReviewCard from "@/components/ReviewCard";
import TitleSection from "@/components/shared/TitleWithHelmet";
import { TReview } from "@/types/TReviews";

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = process.env.BACKEND_URL;
        if (!url) throw new Error("Backend URL is not defined");

        const res = await fetch(`${url}/reviews`, { cache: "no-cache" });
        const reviewsData = await res.json();
        const sortedReviews = reviewsData.data.sort(
          (a: TReview, b: TReview) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setReviews(sortedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft ?? 0));
    setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="px-4">
      <TitleSection header="What Say Our Awesome" optional="Customer" title="Reviews" />

      <div
        className="overflow-x-scroll scrollbar-hide relative px-2"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={() => setIsDragging(false)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        style={{ overflowY: "hidden", cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="flex gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllReviewsPage;
