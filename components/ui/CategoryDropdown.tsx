import categoryApiRequest from "@/apiRequest/category";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./navigation-menu";

const Categories = async () => {
  const categoriesRespone = await categoryApiRequest.getAll();
  const categories = categoriesRespone.data;

  return (
    <NavigationMenu className="hidden sm:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <div className="text-sm font-semibold ">Shop my category</div>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-[200px] bg-red">
              {categories.map((item, index) => (
                <li key={index} className="px-4 py-2">
                  <NavigationMenuLink href={`/categories/${item.id}`}>
                    {item.name}
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Categories;
