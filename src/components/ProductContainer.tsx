"use client";
import React, { useEffect, useState } from "react";
import { TProduct } from "@/types/TProducts";
import { TCategory } from "@/types/TCategory";
import ProductCard from "./ui/ProductCard";
import TitleSection from "./shared/TitleWithHelmet";
import { usePathname, useSearchParams } from "next/navigation";
import ProductTableCard from "./ui/ProductTableCard";

const ProductContainer = ({
  products,
  categories,
}: {
  products: TProduct[];
  categories: TCategory[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const itemsPerPage = 12;

  // Map category IDs to names for filtering
  const categoryMap = new Map(categories.map((cat) => [cat._id, cat.name]));
  const uniqueCategories = ["All", ...categories.map((cat) => cat.name)];

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const isHomePage = pathName === "/";
  const isProductManage = pathName === "/admin/productManagement";

  useEffect(() => {
    const categoryFromQuery = searchParams.get("category");
    if (categoryFromQuery) {
      setSelectedCategory(decodeURIComponent(categoryFromQuery));
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const categoryName = categoryMap.get(product.category)?.toLowerCase() || "";
    const matchesCategory =
      selectedCategory.toLowerCase() === "all" ||
      categoryName === selectedCategory.toLowerCase();
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products based on the selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "priceHighToLow") {
      return b.price - a.price;
    } else if (sortBy === "priceLowToHigh") {
      return a.price - b.price;
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("default");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Ensure client-side rendering
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-4 m-4">
      {!isProductManage && (
        <TitleSection
          header="Our Awesome"
          optional="Product"
          title="Product"
        />
      )}
      
      {!isHomePage && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-1/4 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-1/4 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="default">Default Price</option>
            <option value="priceHighToLow">Price High to Low</option>
            <option value="priceLowToHigh">Price Low to High</option>
          </select>
          <button
            onClick={handleClearFilters}
            className="bg-red-500 text-white px-6 py-2 rounded-md shadow-sm hover:bg-red-400 transition duration-200"
          >
            Clear
          </button>
        </div>
      )}

      {isProductManage ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Description</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Stock</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <ProductTableCard key={product._id} product={product} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-500 p-4"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid mx-auto grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found.
            </p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-white text-blue-500"
                } hover:bg-blue-400 hover:text-white transition duration-200`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductContainer;
