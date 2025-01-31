/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductUpdateForm from '@/components/ProductUpdateForm';
import { TProduct } from '@/types/TProducts';
import React from 'react';
// interface PageProps {
//     params: { productId: string };
//   }
const SingleProductForUpdate =async ({ params }: any) => {
    console.log({ params });
    
      const res = await fetch(
        `${process.env.BACKEND_URL}/products/${params.productId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      const product: TProduct = data?.data;
    
    return (
        <div>
            <ProductUpdateForm key={product._id} product={ product} />
        </div>
    );
};

export default SingleProductForUpdate;