"use client";
import { useAppContext } from "@/app/app-provider";
import { useEffect, useState } from "react";

const UserProfile = ({ className }: { className?: string }) => {
  const { user, isAuthenticated } = useAppContext();
  const [isHydrated, setIsHydrated] = useState(false);

  // Đảm bảo component chỉ render sau khi client-side hoàn tất
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Nếu chưa hydrate, không render gì cả
  if (!isHydrated) {
    return null;
  }

  return (
    <div className={`min-w-25 ${className}`}>
      {isAuthenticated ? (
        <>
          Hi! <span>{user?.username}</span>
        </>
      ) : (
        <>
          Hi!{" "}
          <a href="/sign-in" className="underline text-[#0654ba]">
            Sign in
          </a>
          &nbsp;
          <span className="hidden lg:inline-block">
            or{" "}
            <a href="/register" className="underline text-[#0654ba]">
              Register
            </a>
          </span>
        </>
      )}
    </div>
  );
};

export default UserProfile;
