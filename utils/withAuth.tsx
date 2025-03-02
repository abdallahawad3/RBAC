/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/redux/store";

export default function withAuth(Component: any, allowedRoles: string[]) {
  return function ProtectedRoute(props: any) {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/login");
      } else if (!allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      }
    }, [user, router]);

    if (!user || !allowedRoles.includes(user.role)) return null;

    return <Component {...props} />;
  };
}
