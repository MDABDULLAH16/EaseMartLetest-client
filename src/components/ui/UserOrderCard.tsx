/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TOrder } from "@/types/TOrder";
import Image from "next/image";

const UserOrderCard = ({
  orders,
  product,
}: {
  orders: TOrder[];
  product: any;
}) => {
  // Find all orders that contain this product
  const matchingOrders = orders.filter((order) =>
    order.products.some((p) => p.product === product.data._id)
  );

  // Calculate total quantity ordered for this product
  const totalQuantity = matchingOrders.reduce((sum, order) => {
    const productOrder = order.products.find(
      (p) => p.product === product.data._id
    );
    return sum + (productOrder?.quantity || 0);
  }, 0);

  // Get payment status (if multiple, show as "Mixed" or choose a logic)
  const paymentStatuses = [
    ...new Set(matchingOrders.map((order) => order.paymentStatus)),
  ];
  const paymentStatus =
    paymentStatuses.length === 1 ? paymentStatuses[0] : "Mixed";

  // Calculate total price based on quantity
  const totalPrice = totalQuantity * product.data.price;

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50 transition duration-200">
      {/* Product Image */}
      <td className="p-4">
        <div className="relative w-20 h-20">
          <Image
            src={
              product.data.image ||
              "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
            }
            alt={product.data.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </td>

      {/* Product Details */}
      <td className="p-4 font-medium text-gray-800">{product.data.name}</td>
      <td className="p-4 font-medium text-gray-800">{paymentStatus}</td>
      <td className="p-4 font-medium text-gray-800">{totalQuantity}</td>
      <td className="p-4 font-semibold text-blue-600">
        ${totalPrice.toFixed(2)}
      </td>

      {/* Actions
      <td className="p-4">
        <Link href={`/order/${product._id}`}>
          <button
            className="bg-blue-600 px-2 text-white rounded-md hover:bg-blue-700 transition duration-200"
            aria-label="See Details"
          >
            Details
          </button>
        </Link>
      </td> */}
    </tr>
  );
};

export default UserOrderCard;
