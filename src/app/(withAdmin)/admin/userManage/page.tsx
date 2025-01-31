import UserTable from "@/components/UserTable";


const UserManagePage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/auth`, {
    cache: "no-cache",
  });
  const data = await res.json();
  const users = data?.data;

  return (
    <div>
      {/* Pass entire users array to UserTable */}
      <UserTable user={users} />
    </div>
  );
};

export default UserManagePage;
