// /* eslint-disable @typescript-eslint/no-explicit-any */
// interface ProductReviewPageProps {
//   params: { productId: string };
// }

// const ProductReviewPage = async ({ params }: ProductReviewPageProps) => {
//   console.log("product reviews ", params);

//   const res = await fetch(
//     `${process.env.BACKEND_URL}/reviews/${params.productId}`,
//     {
//       cache: "no-store", // Prevents caching if needed
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch reviews");
//   }

//   const reviews = await res.json();

//   return (
//     <div>
//       <h1>User Reviews</h1>
//       {reviews.length > 0 ? (
//         <ul>
//           {reviews.map((review: any) => (
//             <li key={review.id}>{review.comment}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>No reviews available.</p>
//       )}
//     </div>
//   );
// };

// export default ProductReviewPage;
