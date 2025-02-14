import ReviewCard from "@/components/ReviewCard";
import TitleSection from "@/components/shared/TitleWithHelmet";
import { TReview } from "@/types/TReviews";

const AllReviewsPage = async () => {
  // Fetch reviews from the
  const url = process.env.BACKEND_URL;
  if (!url) {
    throw new Error("Backend URL is not defined AllReviewPage");
  }
  const res = await fetch(`${url}/reviews`, {
    cache: "no-cache",
    next: { revalidate: 30 },
  });
  const reviewsData = await res.json();
  const reviews = reviewsData.data;

  // // Sort reviews by the 'createdAt' field (or any other timestamp field)
  // const sortedReviews = reviews.sort(
  //   (a: TReview, b: TReview) =>
  //     new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  // );

  // console.log("all reviews", sortedReviews);

  return (
    <div>
      {/* Title Section */}
      <div>
        <TitleSection
          header={"What Say Our Awesome"}
          optional={"Customer"}
          title={"Reviews"}
        />
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.slice(0, 8).map((review: TReview) => (
          <ReviewCard review={review} key={review._id} />
        ))}
      </div>
    </div>
  );
};

export default AllReviewsPage;
