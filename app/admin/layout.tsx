"use client";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/app-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // Khi useEffect chạy lần đầu tiên, kiểm tra trạng thái authentication
    if (isAuthenticated != null) {
      if (user?.role != "admin") {
        router.push("/"); // Chuyển hướng về trang chủ
      }
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated != null && user?.role == "admin") {
    return <AdminPanelLayout>{children}</AdminPanelLayout>; // Hoặc bạn có thể hiện thị loading spinner
  }

  return <p>Loading...</p>;
}
