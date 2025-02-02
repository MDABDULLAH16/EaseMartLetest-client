"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { selectUserInfo } from "@/redux/features/userDetailsSlice";
import CreateOrder from "@/utils/actions/CreateOrder";



const CheckoutPage = () => {
  const currentUser = useSelector(selectUserInfo); // Assuming user data is in Redux
  const allCartItems = useSelector((state: RootState) => state.cart.items);
  const cartItems = allCartItems.filter(item => item.userId === currentUser?._id)
  console.log('st item',cartItems);
  
 
  

  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.stockQuantity, 0)
    .toFixed(2);

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    address: currentUser?.address || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    paymentMethod: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    try {
      const orderData = {
        user: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
        products: cartItems.map((item) => (console.log('items',item._id),
        {                 
          product: item._id,
          quantity: item.stockQuantity,
        })),
        // totalPrice: parseFloat(totalPrice),
      
      };
  
      // console.log("Proceeding to Payment with Order Data:", orderData);
  
      const response = await CreateOrder(orderData);
      if (response.success) {
        window.location.href = response.data.payment_url;
     }
     
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Checkout
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Details */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Shipping Details
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}              
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
            {/* <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select> */}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center text-gray-600"
              >
                <span>
                  {item.name} (x{item.stockQuantity})
                </span>
                <span>${(item.price * item.stockQuantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white py-2 mt-6 rounded-lg hover:bg-green-600 transition"
          >
            Proceed to Payment 💳
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
