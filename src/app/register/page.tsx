"use client";

import { TUser } from "@/types/TUser";
import CreateUser from "@/utils/actions/CreateUser";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// export type UserData = {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
//   add
// };

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>();

  const onSubmit = async (data: TUser) => {
    const finalData: TUser = { ...data, role: "user" ,phone:Number(data.phone)}
      console.log(finalData);
      
    try {
      const res = await CreateUser(finalData)
     console.log(res.success==='false');
     
      
      if (res.success===false) {
        toast.warn(res.errorSources[0].message)
        return
      } else {
                toast.success(res?.message)
      }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.warn(err.message)
      throw new Error('err',err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center  p-6">
          <Image
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg"
            width={400}
            height={300}
            alt="Register page illustration"
            className="w-full h-auto"
          />
        </div>

        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                {...register("name", { required: "Full Name is required" })}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Phone</label>
              <input
                type="number"
                {...register("phone", { required: "Phone Number is required" })}
                placeholder="Enter your Phone Number"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Enter your Address"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4">
            Already have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
