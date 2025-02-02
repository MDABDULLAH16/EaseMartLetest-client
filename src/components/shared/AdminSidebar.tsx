
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";


const AdminSidebar = () => {

  return (
    <div>
      <ul className="menu bg-base-200 min-h-screen rounded-box">
        <li>
          <Link href="/admin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Admin Panel
          </Link>
        </li>
        <li>
          <Link href="/admin/productManagement">
            <IoCartOutline className="text-xl" />
            Product Management
          </Link>
        </li>
        <li>
          <Link href="/admin/userManage">
            <FaRegUser className="text-xl" />
            User Management
          </Link>
        </li>
        <li>
          <Link href="/admin/categoryManagement">
            <MdCategory className="text-xl" />
            Category Management
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
