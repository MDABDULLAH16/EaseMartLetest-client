import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative w-full left-0 right-0 mx-auto overflow-hidden">
      {/* Full-width background */}
      <div className="absolute inset-0">
        <Image
          src="https://img.freepik.com/free-photo/front-view-cyber-monday-shopping-cart-with-bags_23-2148657637.jpg?uid=R62967149&ga=GA1.1.159305073.1738334521"
          alt="Modern eCommerce Banner"
          fill
          priority
          style={{ objectFit: "cover" }} // Modern replacement for legacy `objectFit`
          className="w-full h-full"
        />
        {/* Overlay for dimming the image */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center px-4">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-lg">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
            EaseMart
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-sm md:text-lg text-white mb-8 max-w-2xl drop-shadow-md">
          Discover amazing features and services that await you. Shop smarter,
          live better with our premium products.
        </p>

        {/* Call-to-Action Button */}
        <Link
          href="/product"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-400 py-3 px-8 rounded-full text-sm md:text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Banner;
