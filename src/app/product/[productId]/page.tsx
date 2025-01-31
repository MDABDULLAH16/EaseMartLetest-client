/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import ProductDetailsCard from "@/components/ui/ProductDetailsCard";

// import ProductDetailsCard from "@/components/ui/ProductDetailsCard";

// Define the type for params
// interface TProductId {
//   params: {
//     productId: string;
//   };
// }

const ProductDetailsPage = async ({ params }:any) => {
  // Log the params object
  console.log(params);

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

  // Log the product name for debugging
  console.log(product.name);

  return (
    <div>
      {/* Render the ProductDetailsCard component */}
      {product ? (
        <ProductDetailsCard key={product._id} product={product} />
        
        
      ) : (
        <p className="text-center text-red-500">Product not found!</p>
      )}
    </div>
  );
};

export default ProductDetailsPage;