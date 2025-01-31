"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * item.stockQuantity, 0)
    .toFixed(2);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    paymentMethod: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log({
      shippingDetails: formData,
      orderSummary: cartItems.map((item) => ({
        name: item.name,
        quantity: item.stockQuantity,
        price: (item.price * item.stockQuantity).toFixed(2),
      })),
      totalPrice,
    });
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
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
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 mt-6 rounded-lg hover:bg-green-600 transition"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
