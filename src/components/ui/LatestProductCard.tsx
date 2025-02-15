import Image from "next/image";
import { TProduct } from "@/types/TProducts";

const LatestProductCard = ({ products }: { products: TProduct[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="max-w-sm w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-2"
        >
          <div className="relative w-full h-56">
            <Image
              src={
                product.image ||
                "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
              }
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-2xl"
            />
            <div className="absolute top-4 right-4 bg-gray-100 text-xs font-bold px-3 py-2 rounded-full shadow-md">
              NEW
            </div>
          </div>
          <div className="p-4 pt-2">
            <h3 className="text-xl font-bold text-gray-800 truncate">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 ">
              {product.description}
            </p>
            <div className="flex items-center justify-between ">
              <span className="text-lg font-semibold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <button className="mt-4 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestProductCard;
