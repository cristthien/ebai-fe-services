import { Heart, Bell, Search } from "lucide-react";
import Divider from "./ui/Divider";
import Image from "next/image";
import UserProfile from "@/components/ui/UserProfile";
import MyEbayAccount from "./ui/MyEbayAccount";
import Link from "next/link";
import Categories from "./ui/CategoryDropdown";
import SearchBar from "./ui/SearchBar";

export default function Header() {
  return (
    <div className="">
      <div className="container mx-auto text-sm flex items-center justify-between font-semibold px-6 min-h-9">
        <div className="flex">
          <UserProfile className="mr-4 flex-shrink-0" />
        </div>
        <div className="flex flex-row justify-center items-center mr-2 sm:mr-0 ">
          <MyEbayAccount />
          <Bell className="w-5 h-5 mx-4" />
          {/* Cart Icon */}
          <Heart className="w-5 h-5  mx-4 hidden sm:block" />
        </div>
      </div>
      <Divider className="h-[1px] w-[100%] bg-gray-300 " />
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center ">
          <Link href="/" className="w-[80px]">
            <Image
              src="/ebai.svg" // Đường dẫn tương đối từ thư mục public
              alt="Example SVG"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
            />
          </Link>
          <Categories />
        </div>
        {/* Search Bar */}
        <SearchBar />
        <Link className="block min-[350px]:hidden" href="/products/search">
          <Search></Search>
        </Link>
      </div>
      <Divider className="h-[1px] w-[100%] bg-gray-300 " />
    </div>
  );
}
