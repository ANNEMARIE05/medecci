"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "admin") {
      router.replace("/dashboard/superadmin");
    } else {
      router.replace("/dashboard/admin");
    }
  }, [router]);
  return null;
} 