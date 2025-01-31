"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TProduct } from "@/types/TProducts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  // User details from redux store
  const userInfo = useSelector((state: RootState) => state.userDetails);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Handle removal of item from cart
  const handleRemoveItem = (id: string) => {
    if (id) {
      dispatch(removeFromCart(id));
    }
  };

  // Handle updating stock quantity of an item
  const handleStockQuantityChange = (id: string, newStockQuantity: number) => {
    if (id && newStockQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newStockQuantity }));
    }
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.stockQuantity, 0)
      .toFixed(2);
  };

  // Handle checkout action
  const handleCheckout = () => {
    // Redirect to the checkout page
    router.push("/checkout");
  };

  // Hydration check for SSR
  if (!isHydrated) {
    return null; // Wait for hydration to avoid rendering issues on SSR
  }

  // Display message when cart is empty
  if (cartItems.length === 0) {
    return <div className="text-center">Your cart is empty!</div>;
  }

  // Get last login from userInfo (or localStorage as a fallback)
  const lastLogin = userInfo?.lastLogin || localStorage.getItem("lastLogin");

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      {lastLogin && (
        <div className="mb-4 text-sm text-gray-600">
          <strong>Last Login:</strong> {new Date(lastLogin).toLocaleString()}
        </div>
      )}
      <div className="space-y-6">
        {cartItems.map((item: TProduct) => {
          // Ensure _id is defined before rendering
          if (!item._id) {
            console.error("Item missing _id:", item);
            return null;
          }

          return (
            <div
              key={item._id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center">
                <Image
                  src={item.image || 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko='}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                  width={400}
                  height={400}
                />
                <div className="ml-4">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    handleStockQuantityChange(item._id!, item.stockQuantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.stockQuantity}
                  onChange={(e) =>
                    handleStockQuantityChange(
                      item._id!,
                      parseInt(e.target.value, 10)
                    )
                  }
                  className="w-12 text-center border-t border-b"
                />
                <button
                  onClick={() =>
                    handleStockQuantityChange(item._id!, item.stockQuantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded-r-md"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(item._id!)}
                  className="ml-4 text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8">
        <div className="flex justify-between items-center text-lg font-bold mb-4">
          <span>Total Price:</span>
          <span>${calculateTotal()}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-500 text-white py-2 rounded-lg"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;