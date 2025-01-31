/* eslint-disable @typescript-eslint/no-explicit-any */
import UpdateCategoryForm from "../../../../../components/UpdateCategoryForm";
import { TCategory } from "../../../../../types/TCategory";


// interface PageProps {
//   params: { category: string };
// }

const SingleCategory = async ({ params }:any) => {
  console.log({ params });

  const res = await fetch(
    `${process.env.BACKEND_URL}/categories/${params.category}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }
  const data = await res.json();
  const category: TCategory = data?.data;

  return (
    <div>
     
      <UpdateCategoryForm key={category?._id} category={category} />
    </div>
  );
};


export default SingleCategory;