"use server";


import { TUser } from '@/types/TUser';

const CreateUser = async (data: TUser) => {
  const url = process.env.BACKEND_URL;
  const res = await fetch(`${url}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-Type": "application/json",
    },
    cache: "no-cache",
    next: { revalidate: 30 },
  });
    const user = await res.json();
    console.log('users',user);
    
  return user;
};

export default CreateUser;
