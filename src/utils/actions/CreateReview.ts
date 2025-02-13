import { TReview } from "@/types/TReviews";

const CreateReviews = async (data: TReview) => {
  const res = await fetch(`${process.env.BACKEND_URL}/reviews`, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    next: {
      revalidate: 30,
    },
    cache: "no-cache",
  });
  return await res.json();
};

export default CreateReviews;
