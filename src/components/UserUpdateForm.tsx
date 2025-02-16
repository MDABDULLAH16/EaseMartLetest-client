/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import { TUser } from "@/types/TUser";
import { toast } from "react-toastify";
import UpdateUser from "@/utils/actions/UpdateUser";
import { useRouter } from "next/navigation";


const UpdateUserForm = ({ user }: { user: TUser }) => {
  const router = useRouter();


  // Ensure user._id exists before proceeding
  if (!user._id) {
    toast.warn("User ID is missing. Cannot update profile.");
    return null; // Render nothing if user._id is undefined
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<TUser>({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone,
      role: user.role || "user",
      address: user.address || "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      if (!user._id) {
        toast.warn("User ID is missing. Cannot update profile.");
        return null;
      }
      const res = await UpdateUser(user._id, data);
   
      // Safe to use user._id here
      toast.success(res.message);
      router.push('/admin/userManage');
      router.refresh();
    } catch (err: any) {
      toast.warn(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Update Your Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number (Optional)
          </label>
          <input
            type="number"
            id="phone"
            {...register("phone")}
            className={`w-full px-3 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Role Field */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Role (Optional)
          </label>
          <select
            id="role"
            {...register("role")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            className={`w-full px-3 py-2 border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            rows={3}
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;