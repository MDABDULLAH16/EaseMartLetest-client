/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import MyInfoUpdateForm from "@/components/MyinfoUpdateForm";

import { TUser } from "@/types/TUser";

const AdminUpdatePage = async ({ params }: any) => {
  const url = process.env.BACKEND_URL;

  // Fetch user data from the backend
  const res = await fetch(`${url}/auth/${params.myInfo}`, {
    cache: "no-cache", // Disable caching for fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  // console.log("API Response Data:", data);

  const user: TUser = data?.data;

  return (
    <div>
      {/* <UpdateUserForm key={user._id} user={user} /> */}
      <MyInfoUpdateForm key={user._id} user={user} />
    </div>
  );
};

export default AdminUpdatePage;
