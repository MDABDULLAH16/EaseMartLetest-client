import Link from "next/link";
import DeleteButton from "./ui/DeleteButton";
import { TCategory } from "@/types/TCategory";

const CategoryTable = ({ category }: { category: TCategory }) => {
  return (
    <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
      {category ? (
        <ul className="space-y-4">
          <li className="border-b pb-4 last:border-0">
            {/* Name */}
            <div className="mb-2">
              <span className="text-gray-800 font-bold">
                {category.name || "Unnamed Category"}
              </span>
            </div>

            {/* Description */}
            <div className="mb-2">
              <span className="text-gray-600">
                {category.description
                  ? category.description.length > 50
                    ? category.description.slice(0, 50) + "..."
                    : category.description
                  : "No description available."}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <DeleteButton
                key={category._id}
                categoryId={category._id || ""}
              />
              <Link
                href={`/admin/categoryManagement/${category._id}`}
                className="py-2 px-4 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition"
              >
                Update
              </Link>
            </div>
          </li>
        </ul>
      ) : (
        <div className="text-center text-gray-500">
          No category data available.
        </div>
      )}
    </div>
  );
};

export default CategoryTable;
