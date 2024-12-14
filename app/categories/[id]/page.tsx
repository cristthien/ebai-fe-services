import categoryApiRequest from "@/apiRequest/category";
import MainLayout from "@/app/layouts/main";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CategoriesSideBar from "./components/CategoriesSideBar";
import { convertFiltersToQueryString } from "@/lib/utils";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
function parseSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const parsed: Record<string, string[]> = {};

  for (const key in searchParams) {
    const value = searchParams[key];

    if (typeof value === "string") {
      // Nếu value là chuỗi, tách thành mảng
      parsed[key] = value.split(",");
    } else if (Array.isArray(value)) {
      // Nếu value là mảng, gộp tất cả các giá trị trong mảng và tách tiếp
      parsed[key] = value.flatMap((v) => v.split(","));
    } else {
      // Nếu value là undefined hoặc không hợp lệ, gán mảng rỗng
      parsed[key] = [];
    }
  }

  return parsed;
}

export default async function Page(props: Props) {
  const params = await props.params;
  const id = (await params).id;
  const searchParams = await props.searchParams;
  const filters = parseSearchParams(searchParams);
  const query = convertFiltersToQueryString(filters);

  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const categoriesRes = await categoryApiRequest.getAll();
  const detailCategoriesRes = await categoryApiRequest.getSepecificCategory(
    id,
    page,
    limit,
    query
  );
  const categories = categoriesRes.data;
  const detailCategories = detailCategoriesRes.data;
  const currentCategory = detailCategories.category;
  const products = detailCategories.auctions.data;
  const pagination = {
    total: detailCategories.auctions.total,
    currentPage: detailCategories.auctions.currentPage,
    totalPages: detailCategories.auctions.totalPages,
  };

  return (
    <MainLayout>
      <div className="container px-6 mx-auto mb-5">
        <div className="mt-4 mb-6">
          <h2 className=" text-3xl font-bold ">{currentCategory.name}</h2>
          <p>{currentCategory.description}</p>
        </div>
        <div className="grid grid-cols-10 gap-8">
          {/* Cột 1 (Sidebar Categories - 2/10 width) */}
          <CategoriesSideBar
            categories={categories}
            currentCategory={currentCategory}
            filters={filters}
          />
          {/* Dialog for small screens */}
          <Dialog>
            <DialogTrigger className="block col-span-10 md:hidden bg-[#3665f3] hover:bg-[#3665f3] hover:opacity-80 py-2 rounded-lg font-semibold text-white">
              Product Categories
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Categories</DialogTitle>
                <DialogDescription>
                  Select a category to view products.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {categories.map((category: any) => (
                  <Link
                    className=" block w-full"
                    key={category.id}
                    href={`/categories/${category.id}`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          {/* Cột 2 (Product details - 8/10 width) */}
          <div className="col-span-10 md:col-span-8 border-t ">
            <h3 className="mt-4">
              {" "}
              {detailCategories.auctions.total} sản phẩm được tìm thấy
            </h3>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-4 gap-4">
              {products.map((product: any, index: number) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className={`flex flex-row justify-between mt-5 px-6 `}>
              <Button
                variant="outline"
                size="icon"
                disabled={pagination.currentPage === 1}
                asChild // Disable if on the first page
              >
                <Link
                  href={`/categories/${currentCategory.id}?page=${Math.max(
                    pagination.currentPage - 1,
                    1 // Ensure it doesn't go below 1
                  )}`}
                >
                  <ChevronLeft />
                </Link>
              </Button>
              <span className="font-semibold">
                {" "}
                {`${pagination?.currentPage} / ${pagination?.totalPages}`}
              </span>
              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                asChild
                disabled={pagination?.currentPage === pagination?.totalPages} // Disable if on the last page
              >
                <Link
                  href={`/categories/${currentCategory.id}?page=${Math.min(
                    pagination.currentPage + 1,
                    pagination.totalPages // Ensure it doesn't go above totalPages
                  )}`}
                >
                  <ChevronRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
