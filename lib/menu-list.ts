import {
  LayoutGrid,
  LucideIcon,
  ShoppingBag,
  Store,
  PanelsTopLeft,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          icon: PanelsTopLeft,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Categories",
      menus: [
        {
          href: "/admin/create-category",
          label: "Add Category",
          icon: LayoutGrid,
        },
      ],
    },
    {
      groupLabel: "Bids & Offers",
      menus: [
        {
          href: "/admin/bids",
          label: "Bids",
          icon: ShoppingBag,
        },
        {
          href: "/admin/offers",
          label: "Offers",
          icon: Store,
        },
      ],
    },
  ];
}
