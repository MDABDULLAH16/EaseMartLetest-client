import Image from "next/image";
import Link from "next/link";



const Banner = () => {
  return (
    <div>
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://img.freepik.com/premium-photo/smiling-millennial-arab-husband-show-credit-card-wife-use-laptop-sit-floor-with-many-bags-with_116547-79071.jpg?w=900"
            alt="Background Image"
            fill
            priority
            className="object-cover object-center"
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
