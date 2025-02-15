
import LatestProductCard from "@/components/ui/LatestProductCard";
import { TProduct } from "@/types/TProducts";

const LatestProductsPage = async () => {
  try {
    // Fetch products
    const productsRes = await fetch(`${process.env.BACKEND_URL}/products`, {
      cache: "no-store",
    });
    const productsData = await productsRes.json();
    const products = productsData?.data 

    // Sort products by latest first (non-mutating)
    const latestProducts = products.sort(
       (a: TProduct, b: TProduct) =>
         new Date(b.createdAt).getTime() - new Date(a.createdAt ).getTime()
     );

    // console.log("Sorted Products:", latestProducts);

    // Fetch categories
    // const categoriesRes = await fetch(`${process.env.BACKEND_URL}/categories`, {
    //   cache: "no-store",
    // });
    // const categoriesData = await categoriesRes.json();
    // const categories = categoriesData?.data || [];
    // console.log("Categories:", categories);

    return (
      <div>
        {/* <ProductContainer products={latestProducts} categories={categories} /> */}
        <div className="my-12 mb-16 text-center"> 
        <h1 className="font-bold text-4xl  ">Latest Product</h1>
        <p  >Check & Get Your Desired Product!</p>
        </div>
        <LatestProductCard products={latestProducts} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-500">
          Failed to load products
        </h1>
      </div>
    );
  }
};

export default LatestProductsPage;


