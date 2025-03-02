"use client";

import { useAppDispatch } from "@/hooks/redux";
import { logout } from "@/redux/Auth/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(logout());
    router.push("/login");
  };

  return (
    <button
      className="bg-red-500 text-white p-2 rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
