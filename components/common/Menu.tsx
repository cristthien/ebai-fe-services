import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";

interface MenuProps {
  menuItems: string[];
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  return (
    <ul className="w-[200px]">
      {menuItems.map((item, index) => (
        <li key={index}>
          <NavigationMenuLink href="#">{item}</NavigationMenuLink>
        </li>
      ))}
    </ul>
  );
};
export default Menu;
