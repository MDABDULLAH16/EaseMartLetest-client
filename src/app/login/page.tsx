/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { setUserInfo } from "@/redux/features/userDetailsSlice";
import LoginUser from "@/utils/actions/LoginUser";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Cookies from "js-cookie";
// Import Cookies utility for setting cookies

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await LoginUser(data);
      if (!res?.data?.accessToken) {
        toast.warning(res?.message || "Login failed");
        return;
      }

      // Extract user info and access token
      const { accessToken, userInfo } = res.data;

      // Set the auth token in a cookie
      Cookies.set("authToken", accessToken, { expires: 7 }); // Expires in 7 days

      // Store user info in localStorage and Redux state
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      dispatch(setUserInfo(userInfo));

      // Show success message and redirect
      toast.success("User login successful");
      router.push("/"); // Redirect to a protected route (e.g., /about or /dashboard)
    } catch (err: any) {
      toast.warning(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center p-6">
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            width={400}
            height={300}
            alt="Login page illustration"
            className="w-full h-auto"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
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
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don&apos;t have an account? <Link href="/register" className="text-blue-500 hover:underline">Sign up</Link>
          </p>
          <div className="mt-6 text-center">
            <p className="mb-2 text-gray-600">Or Sign In Using</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => signIn("google", { callbackUrl: "/about" })} // Redirect to /about after Google login
                className="p-2 border rounded-full hover:shadow-lg"
              >
                <Image src="/google-logo.png" width={30} height={30} alt="Google logo" />
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/about" })} // Redirect to /about after GitHub login
                className="p-2 border rounded-full hover:shadow-lg"
              >
                <Image src="/github-logo.png" width={30} height={30} alt="GitHub logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;