import ProductsPage from "@/app/product/page";
import AddProductBtn from "@/components/ui/AddProductBtn";

const ProductsManagementPage = () => {
  return (
    <div>
      <div className="text-end m-6">
        {" "}
        <AddProductBtn />
      </div>
      <ProductsPage />
    </div>
  );
};

export default ProductsManagementPage;
