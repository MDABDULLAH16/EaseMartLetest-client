import Image from "next/image";
import Link from "next/link";
// import banner1 from "../assets/banner/banner1.jpg";

const Banner = () => {
  return (
    <div>
      <div className="relative bg-gradient-to-r mt-4 from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags_23-2148657637.jpg?uid=R62967149&ga=GA1.1.159305073.1738334521"
            fill
            priority
            className=""
            alt="Banner"
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Welcome to Our Awesome <span className="">EaseMart</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 mb-8">
            Discover amazing features and services that await you.
          </p>
          <Link
            href="/product"
            className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-sm md:text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
