
"use client";
import UserOrderCard from "@/components/ui/UserOrderCard";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { useAppSelector } from "@/redux/hooks";
import { TOrder } from "@/types/TOrder";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderListPage = () => {
  const user = useAppSelector(selectUserInfo);
  const [orders, setOrders] = useState<TOrder[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // console.log("Orders:", orders);
  // console.log("Products:", products);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      try {
        // Fetch orders
        const res = await fetch(`${process.env.BACKEND_URL}/orders/${user?.email}`, {
          cache: "no-cache",
        });
        const allOrders = await res.json();
        const ordersData = allOrders?.data || [];
        setOrders(ordersData);

        // Extract product IDs from orders
        const productsId: string[] = ordersData.flatMap((order: TOrder) =>
          order.products?.map((p) => p.product) || []
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
              const res = await fetch(`${process.env.BACKEND_URL}/products/${productId}`, {
                cache: "no-cache",
              });
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
  );
};

export default OrderListPage;
