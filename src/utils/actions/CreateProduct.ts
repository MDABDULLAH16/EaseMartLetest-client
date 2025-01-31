"use server";

import { TProduct } from "@/types/TProducts";

const CreateProduct = async (data: TProduct) => {
  const url = process.env.BACKEND_URL;
  const res = await fetch(`${url}/products`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-Type": "application/json",
    },
    cache: "no-cache",
    next: { revalidate: 30 },
  });
  const products = await res.json();
  return products;
};

export default CreateProduct;
