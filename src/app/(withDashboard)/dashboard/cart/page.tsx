"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { updateQuantity, removeFromCart } from "@/redux/features/cartSlice";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userInfo = useSelector(selectUserInfo);
  const allCartItems = useSelector((state: RootState) => state.cart.items);
  const [isHydrated, setIsHydrated] = useState(false);

  // Filter cart items for the current user
  const cartItems = allCartItems.filter((item) => item.userId === userInfo?._id);
  console.log("retrieve", cartItems);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  // Handle quantity update
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity, userId: userInfo?._id as string }));
    }
  };

  // Handle remove item
  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart({ id, userId: userInfo?._id as string }));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.stockQuantity, 0)
      .toFixed(2);
  };

  // Handle checkout
  const handleCheckout = () => {
    if (!userInfo?._id) {
      alert("Please log in to proceed to checkout.");
      return;
    }
    router.push("/checkout");
  };

  // Check if the user is logged in
  if (!userInfo?._id) {
    return <div className="text-center">Please log in to view your cart.</div>;
  }

  // Check if the cart is empty
  if (cartItems.length === 0) {
    return <div className="text-center">Your cart is empty!</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center">
              <Image
                src={item.image || "https://via.placeholder.com/100"}
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
                onClick={() => handleQuantityChange(item._id as string, item.stockQuantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded-l-md"
              >
                -
              </button>
              <input
                type="number"
                value={item.stockQuantity}
                onChange={(e) => handleQuantityChange(item._id as string, parseInt(e.target.value, 10))}
                className="w-12 text-center border-t border-b"
              />
              <button
                onClick={() => handleQuantityChange(item._id as string, item.stockQuantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded-r-md"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(item._id as string)}
                className="ml-4 text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
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
