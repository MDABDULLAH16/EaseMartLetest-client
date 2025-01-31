import Banner from "@/components/Banner";
import ProductsPage from "./product/page";
import Stat from "@/components/Stat";
import ServicesStat from "@/components/ui/ServicesStat";

const HomePage = () => {
  return (
    <div>
      {/* <h1 className="text-4xl text-center mt-10">Welcome To Home Page</h1> */}
      <Banner></Banner>
      <ServicesStat/>
      <ProductsPage/>
      <Stat/>
    </div>
  );
};

export default HomePage;
