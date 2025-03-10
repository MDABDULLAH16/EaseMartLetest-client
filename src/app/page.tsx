// import Banner from "@/components/Banner";
import ProductsPage from "./product/page";
// import Stat from "@/components/Stat";
import ServicesStat from "@/components/ui/ServicesStat";
import CategoryPage from "./categories/page";
import AllReviewsPage from "./ProductReviews/page";
import LatestProductsPage from "./LatestProduct/page";
import PhysicalStorePage from "./physicalStore/page";

const HomePage = () => {
  return (
    <div className="">
      {/* <h1 className="text-4xl text-center mt-10">Welcome To Home Page</h1> */}
      {/* <Banner></Banner> */}
      <CategoryPage />
      <ProductsPage />
      <ServicesStat />
      {/* <ReviewCard /> */}
      <LatestProductsPage/>
      <AllReviewsPage />
      {/* <Stat /> */}
      <PhysicalStorePage/>
    </div>
  );
};

export default HomePage;
