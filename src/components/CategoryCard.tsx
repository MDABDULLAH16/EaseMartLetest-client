import Link from "next/link";
import Image from "next/image";
import DeleteButton from "./ui/DeleteButton";
import { TCategory } from "@/types/TCategory";

const CategoryTable = ({ category }: { category: TCategory }) => {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col relative p-4">
      {category ? (
        <>
          {/* Image */}
          <div className="relative w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name || "Category Image"}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-300 text-gray-500">
                No Image Available
              </div>
            )}
          </div>
          {/* Content Section */}
          <div className="mt-4 flex flex-col flex-grow ">
            <h3 className="text-xl font-bold text-gray-800">
              {category.name || "Unnamed Category"}
            </h3>
            <p className="text-gray-600">
              {category.description || "No description available."}
            </p>
          </div>
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <DeleteButton key={category._id} categoryId={category._id || ""} />
            <Link
              href={`/admin/categoryManagement/${category._id}`}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition text-center"
            >
              Update
            </Link>
          </div>
        </>
      ) : (
        <div className="p-6 text-center text-gray-500">
          No category data available.
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
