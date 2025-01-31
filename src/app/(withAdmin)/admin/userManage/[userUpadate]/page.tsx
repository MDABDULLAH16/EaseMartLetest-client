/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import UpdateUserForm from '@/components/UserUpdateForm';
import { TUser } from '@/types/TUser';

// interface PageProps {
//   params: { userUpadate: string }; // Ensure the type matches the dynamic route parameter
// }

const UserUpdatePage = async ({ params }: any) => {
  console.log('Dynamic Route Params:', params);

  const url = process.env.BACKEND_URL;

  // Fetch user data from the backend
  const res = await fetch(`${url}/auth/${params.userUpadate}`, {
    cache: 'no-cache', // Disable caching for fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await res.json();
  console.log('API Response Data:', data);

  const user: TUser = data?.data;

  return (
    <div>
      <UpdateUserForm key={user._id} user={user} />
    </div>
  );
};

export default UserUpdatePage;