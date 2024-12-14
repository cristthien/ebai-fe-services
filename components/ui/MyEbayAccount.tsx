"use client";
import { ArrowRight, User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuList,
} from "./navigation-menu";
import { Button } from "./button";
import { useAppContext } from "@/app/app-provider";

const MyEbayAccount = () => {
  const { logout, user } = useAppContext();

  const menuItems = [
    { label: "Summary", link: "/myebai/summary" },
    { label: "Bids/Offers", link: "/myebai/bids-offers" },
    { label: "Selling", link: "/myebai/selling" },
  ];

  if (user) {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div className="text-sm font-semibold hidden md:block">
                My eBay
              </div>
              <User className="block md:hidden w-5 h-5" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="overflow-y-auto">
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index} className=" text-sm  mx-4 my-5">
                    {/* Cập nhật NavigationMenuLink với liên kết động */}
                    <NavigationMenuLink href={item.link}>
                      {item.label}
                    </NavigationMenuLink>
                  </li>
                ))}
                <li>
                  <Button
                    onClick={logout}
                    className="text-sm font-semibold py-5 w-full border-t rounded-none text-red-700"
                    variant={"link"}
                  >
                    Sign out
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  return null; // Nếu không có user, trả về null hoặc một nội dung khác
};

export default MyEbayAccount;
