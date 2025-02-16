/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import MyInfoUpdateForm from "@/components/MyinfoUpdateForm";
import { TUser } from "@/types/TUser";

const UserUpdatePage = async ({ params }: any) => {
  const url = process.env.BACKEND_URL;
  const { myInfo } = await params; // ✅ Await params properly

  // Fetch user data from the backend
  const res = await fetch(`${url}/auth/${myInfo}`, {
    cache: "no-cache", // Disable caching for fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  const user: TUser = data?.data;

  return (
    <div>
      <MyInfoUpdateForm key={user._id} user={user} />
    </div>
  );
};

export default UserUpdatePage;
