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
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await LoginUser(data);
      if (!res?.data?.accessToken) {
        toast.warning(res?.message || "Login failed");
        return;
      }

      const { accessToken, userInfo } = res.data;
      Cookies.set("authToken", accessToken, { expires: 7 });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      dispatch(setUserInfo(userInfo));

      toast.success("User login successful");
      router.push("/");
    } catch (err: any) {
      toast.warning(err.message || "An error occurred during login");
    }
  };

  const handleDemoLogin = (role: "admin" | "user") => {
    const email =
      role === "admin"
        ? "admin@programming-hero.com"
        : "user@programming-hero.com";
    const password = "ph-password";
    setValue("email", email);
    setValue("password", password);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className=" md:flex items-center justify-center p-6">
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            width={400}
            height={300}
            alt="Login page illustration"
            className="w-full h-auto"
          />
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Welcome to EaseMart
          </h1>
          <div className="flex justify-center space-x-4 my-4">
            <button
              onClick={() => handleDemoLogin("admin")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Admin Credential
            </button>
            <button
              onClick={() => handleDemoLogin("user")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              User Credential
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <div className="mt-6 text-center">
            <p className="mb-2 text-gray-600">Or Sign In Using</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="p-2 border rounded-full hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
	<path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
	<path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
	<path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
	<path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
</svg>
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/login" })}
                className="p-2 border rounded-full hover:shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
	<path fill="#000" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
</svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
