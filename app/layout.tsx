import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; // Import Open Sans from Google Fonts
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/app/app-provider";

// Load Open Sans font with various weights
const openSans = Open_Sans({
  weight: ["300", "400", "600", "700", "800"], // Different font weights you want to use
  subsets: ["latin"], // You can specify other subsets if needed
});

export const metadata: Metadata = {
  // Tiêu đề dài hơn 30 ký tự
  title: {
    template: "%s | eBai",
    default: "eBai - Discover, Bid, and Own the Latest Tech Products",
  },

  // Mô tả dài hơn 120 ký tự
  description:
    "eBai is your ultimate platform for discovering and bidding on the latest tech products. Win amazing gadgets at unbeatable prices and own your dream devices today. Join us now!",

  // Open Graph Metadata
  openGraph: {
    title: "eBai - Discover, Bid, and Own the Latest Tech Products",
    description:
      "eBai offers the best deals on trending gadgets. Discover, bid, and win top-notch tech products at competitive prices. Start your journey today and grab your dream gadgets!",
    url: process.env.NEXT_PUBLIC_URL || "https://default-ebai.com",
    siteName: "eBai",
    images: [
      {
        url: `${
          process.env.NEXT_PUBLIC_URL || "https://default-ebai.com"
        }/ebai.png`,
        width: 1200,
        height: 630,
        alt: "eBai - The Ultimate Tech Bidding Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Metadata
  twitter: {
    card: "summary_large_image", // Ảnh hiển thị lớn
    site: "@ebai",
    creator: "@ebai_creator",
    title: "eBai - Discover, Bid, and Own the Latest Tech Products",
    description:
      "Join eBai and explore the best deals on the latest tech products. Bid with confidence and own the gadgets you've always wanted. Start bidding now!",
    images: [
      `${process.env.NEXT_PUBLIC_URL || "https://default-ebai.com"}/ebai.png`,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <AppProvider>
          <Toaster />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
