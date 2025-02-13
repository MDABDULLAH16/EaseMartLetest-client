/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import ProductDetailsCard from "@/components/ui/ProductDetailsCard";

const ProductDetailsPage = async ({ params }: any) => {
  // Fetch product details from the backend API
  const res = await fetch(
    `${process.env.BACKEND_URL}/products/${params.productId}`,
    {
      cache: "no-cache", // Disable caching for fresh data
    }
  );

  // Parse the JSON response
  const singleProductJson = await res.json();
  const product = singleProductJson?.data;

  // reviews
  const reviewResponse = await fetch(
    `${process.env.BACKEND_URL}/reviews/${params.productId}`,
    {
      cache: "no-cache", // Disable caching for fresh data
    }
  );
  const reviewsAll = await reviewResponse.json();
  const reviewsData = reviewsAll.data;
  // console.log("reviews data", reviewsData);

  // Log the product name for debugging
  // console.log(product.name);

  return (
    <div>
      {/* Render the ProductDetailsCard component */}
      {product ? (
        <div>
          <ProductDetailsCard
            key={product._id}
            product={product}
            reviews={reviewsData}
          />
        </div>
      ) : (
        <p className="text-center text-red-500">Product not found!</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;
