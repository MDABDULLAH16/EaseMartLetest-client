import { TCategory } from "@/types/TCategory";
import Image from "next/image";
import Link from "next/link";

const CategoryCardForUser = ({ category }: { category: TCategory }) => {
  return (
    <Link
      href={`/product?category=${encodeURIComponent(category.name)}`}
      passHref
    >
      <div className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white p-4 flex flex-col items-center border border-gray-200 sm:p-6 md:p-8 lg:p-10">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-gray-300">
          <Image
            src={
              category.image ||
              "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
            }
            alt={category.name}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 text-center mt-4">
          {category.name}
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 text-center mt-1">
          Explore the best deals
        </p>
      </div>
    </Link>
  );
};

export default CategoryCardForUser;
