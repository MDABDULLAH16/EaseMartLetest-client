"use server";

import { TUser } from "@/types/TUser";

const UpdateUser = async (id: string, data: TUser) => {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    // if (!BACKEND_URL) {
    //   toast.warn("url not fount");
    //   return;
    // }
    const res = await fetch(`${BACKEND_URL}/auth/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });

    if (!res.ok) {
      // If the response is not OK, throw an error with status text
      const errorText = await res.text(); // Read response as text
      throw new Error(`HTTP Error ${res.status}: ${errorText}`);
    }

    const result = await res.json();
    return result;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating User:", error.message);
    throw new Error(error.message);
  }
};

export default UpdateUser;
