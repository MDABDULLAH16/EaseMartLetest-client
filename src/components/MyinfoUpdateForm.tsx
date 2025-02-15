/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { TUser } from "@/types/TUser";
import { toast } from "react-toastify";
import UpdateUser from "@/utils/actions/UpdateUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const MyInfoUpdateForm = ({ user }: { user: TUser }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(user.image || "");

  if (!user._id) {
    toast.warn("User ID is missing. Cannot update profile.");
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<TUser>({
    defaultValues: {
      name: user.name || "",
      phone: user.phone || Number(""),
      image: user.image || "",
      address: user.address || "",
    },
  });

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      // Ensure image field is included in form data
      data.image = imageUrl;

      console.log("Submitting Data:", data); // 🔹 Logs all form data, including the image URL

      const res = await UpdateUser(user._id as string, data);
      toast.success(res.message);
      if (user.role === "admin") {
        router.push("/admin/myProfile");
      } else { 
        router.push("/dashboard/userInfo");
      }
      router.refresh();
    } catch (err: any) {
      toast.warn(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address Field */}
        <div className="col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            rows={3}
            placeholder="Enter your address"
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            {...register("image")}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500"
            placeholder="Enter image URL"
          />
        </div>

        {/* Image Preview */}
        <div className="flex justify-center">
          <Image 
            height={150}
            width={150}
            src={imageUrl || "https://via.placeholder.com/150"}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyInfoUpdateForm;
