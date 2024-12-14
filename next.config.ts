import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: new URL(
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
        ).hostname,
        port: new URL(
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
        ).port,
        pathname: "/images/**", // Đảm bảo rằng đây là đường dẫn chính xác
      },
      {
        protocol: "http",
        hostname: new URL(
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
        ).hostname,
        port: new URL(
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
        ).port,
        pathname: "/public/images/**", // Đảm bảo rằng đây là đường dẫn chính xác
      },
      {
        protocol: "http",
        hostname: new URL(
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
        ).hostname,
        port: new URL(
          process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"
        ).port,
        pathname: "**", // Đảm bảo rằng đây là đường dẫn chính xác
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
        pathname: "/**",
      },
    ],
  },
    output: "standalone",
};

export default nextConfig;
