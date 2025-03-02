"use client";

import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";

export default function Navbar() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyApp
        </Link>

        <div className="space-x-4">
          <Link
            href="/"
            className={`hover:text-gray-400 ${
              pathname === "/" ? "text-blue-400" : ""
            }`}
          >
            Home
          </Link>

          {user ? (
            <>
              {user.role === "admin" ? (
                <>
                  <Link
                    href="/admin/dashboard"
                    className={`hover:text-gray-400 ${
                      pathname === "/admin/dashboard" ? "text-blue-400" : ""
                    }`}
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    href="/admin/users"
                    className={`hover:text-gray-400 ${
                      pathname === "/admin/users" ? "text-blue-400" : ""
                    }`}
                  >
                    Users
                  </Link>
                  <Link
                    href="/admin/settings"
                    className={`hover:text-gray-400 ${
                      pathname === "/admin/settings" ? "text-blue-400" : ""
                    }`}
                  >
                    Settings
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/user/dashboard"
                    className={`hover:text-gray-400 ${
                      pathname === "/dashboard" ? "text-blue-400" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/user/profile"
                    className={`hover:text-gray-400 ${
                      pathname === "/profile" ? "text-blue-400" : ""
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/user/orders"
                    className={`hover:text-gray-400 ${
                      pathname === "/orders" ? "text-blue-400" : ""
                    }`}
                  >
                    Orders
                  </Link>
                  <Link
                    href="/user/settings"
                    className={`hover:text-gray-400 ${
                      pathname === "/settings" ? "text-blue-400" : ""
                    }`}
                  >
                    Settings
                  </Link>
                </>
              )}

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`hover:text-gray-400 ${
                  pathname === "/login" ? "text-blue-400" : ""
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`hover:text-gray-400 ${
                  pathname === "/register" ? "text-blue-400" : ""
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
