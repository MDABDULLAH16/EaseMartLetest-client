"use client";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types/TOrder";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserOrderCard from "./ui/UserOrderCard";

const OrderDetailsContainer = () => {
  const user = useAppSelector(selectUserInfo) as { email: string } | null;
  const [orders, setOrders] = useState<TOrder[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const totalPayment = orders
    .filter((order) => order.totalPrice)
    .reduce((acc, order) => acc + order.totalPrice, 0);
  console.log("Orders:", orders);
  console.log("Products:", products);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        // Fetch orders
        const res = await fetch(
          `${process.env.BACKEND_URL}/orders/${user?.email}`,
          {
            cache: "no-cache",
          }
        );
        const allOrders = await res.json();
        const ordersData = allOrders?.data || [];
        setOrders(ordersData);

        // Extract product IDs from orders
        const productsId: string[] = ordersData.flatMap(
          (order: TOrder) => order.products?.map((p) => p.product) || []
        );

        if (productsId.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch products (removing duplicates to optimize requests)
        const uniqueProductIds = [...new Set(productsId)];
        const fetchedProducts = await Promise.all(
          uniqueProductIds.map(async (productId: string) => {
            try {
              const res = await fetch(
                `${process.env.BACKEND_URL}/products/${productId}`,
                {
                  cache: "no-cache",
                }
              );
              return res.json();
            } catch (error) {
              toast.error(`Error fetching product ${productId}: ${error}`);
              return null;
            }
          })
        );

        // Filter out null values
        setProducts(fetchedProducts.filter((p) => p !== null));
        setLoading(false);
      } catch (error) {
        toast.error(`Error fetching orders: ${error}`);
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [user?.email]); // Only run when user email changes

  return (
      <div>
             <div className="bg-gray-200 text-center ">
    {/* Responsive Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6 md:p-8">
      {/* Card 1: Revenue */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <div className="text-2xl sm:text-3xl dark:text-gray-100">
            Total Order
          </div>
          <div className="flex items-center space-x-1 justify-center text-sm font-medium text-green-600">
            <span className="text-3xl font-semibold">{orders.length}</span>
          </div>
        </div>
      </div>
  
      {/* Card 2: New Customers */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <div className="text-2xl sm:text-3xl dark:text-gray-100">
            Total Product
          </div>
          <div className="flex items-center space-x-1 justify-center text-sm font-medium text-red-600">
            <span className="text-3xl font-semibold">{products.length}</span>
          </div>
        </div>
      </div>
  
      {/* Card 3: New Orders */}
      <div className="relative p-4 sm:p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
        <div className="space-y-2 text-center">
          <div className="text-2xl sm:text-3xl dark:text-gray-100">
            Total Payment
          </div>
          <div className="flex items-center space-x-1 justify-center text-sm font-medium text-green-600">
            <span className="text-3xl font-semibold">{totalPayment.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
          </div>
          {/* ordered product */}
          <div>
      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : (
          <div className="overflow-x-auto">
            <h1 className=" text-4xl font-bold text-center p-4">My All Orders</h1>
          <table className="w-full border-collapse border border-gray-300">
              <thead>
                
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Name</th>
                {/* <th className="border border-gray-300 p-2">Address</th> */}
                <th className="border border-gray-300 p-2">Payment Status</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <UserOrderCard key={product.data._id} orders={ orders}  product={product} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
 </div>
  );
};

export default OrderDetailsContainer;
