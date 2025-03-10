import { TCategory } from "@/types/TCategory";
import Image from "next/image";
import Link from "next/link";

const CategoryCardForUser = ({ category }: { category: TCategory }) => {
  return (
    <Link
      href={`/product?category=${encodeURIComponent(category.name)}`}
      passHref
    >
      <div className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow dark:text-white bg-white dark:bg-[#383838] flex pt-4 pb-2 flex-col items-center border dark:border-none border-gray-200  ">
        <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-20 lg:h-20  overflow-hidden rounded-full border dark:border-none border-gray-300">
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
        <h2 className="text-base sm:text-lg md:text-xl lg:text-sm font-semibold dark:text-white  text-center pt-1 ">
          {category.name}
        </h2>
      
      </div>
    </Link>
  );
};

export default CategoryCardForUser;
