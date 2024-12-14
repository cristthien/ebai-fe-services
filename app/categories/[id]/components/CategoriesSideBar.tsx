"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { convertFiltersToQueryString } from "@/lib/utils";
import {
  CategoryListType,
  CategoryType,
} from "@/schemaValidations/category.schema";
import { CheckedState } from "@radix-ui/react-checkbox";
import clsx from "clsx";
import Link from "next/link";

interface Filters {
  status?: string[];
  condition?: string[];
}

interface CategoriesSideBarProps {
  className?: string;
  categories: CategoryListType;
  currentCategory: CategoryType;
  filters: Filters;
}

const CategoriesSideBar: React.FC<CategoriesSideBarProps> = ({
  className,
  categories,
  currentCategory,
  filters,
}) => {
  const isChecked = (filterType: keyof Filters, value: string) =>
    filters[filterType]?.includes(value);

  function handleStatusChange(status: string, checked: CheckedState) {
    // Lấy bộ lọc hiện tại từ URL (filters có thể được lấy từ router.query)
    const currentStatus = filters.status || [];

    if (checked) {
      // Nếu checked, thêm status vào mảng
      if (!currentStatus.includes(status)) {
        currentStatus.push(status);
      }
    } else {
      // Nếu unchecked, xóa status khỏi mảng
      const index = currentStatus.indexOf(status);
      if (index > -1) {
        currentStatus.splice(index, 1);
      }
    }

    // Cập nhật bộ lọc trong URL
    const updatedFilters = {
      ...filters,
      status: currentStatus,
    };
    const queryString = convertFiltersToQueryString(updatedFilters);
    const pathname = window.location.pathname;
    // Kết hợp chúng lại thành một URL hoàn chỉnh
    const fullUrl = pathname + "?" + queryString;

    // Chuyển hướng trình duyệt đến URL mới
    window.location.href = fullUrl;
  }

  // Handle change for condition filter
  function handleConditionChange(condition: string, checked: CheckedState) {
    // Lấy bộ lọc condition hiện tại từ URL hoặc sử dụng mảng rỗng nếu chưa có
    const currentConditions = filters.condition || [];

    if (checked) {
      // Nếu checked, thêm condition vào mảng điều kiện
      if (!currentConditions.includes(condition)) {
        currentConditions.push(condition);
      }
    } else {
      // Nếu unchecked, xóa condition khỏi mảng điều kiện
      const index = currentConditions.indexOf(condition);
      if (index > -1) {
        currentConditions.splice(index, 1);
      }
    }

    // Cập nhật bộ lọc trong URL
    const updatedFilters = {
      ...filters,
      condition: currentConditions,
    };
    const queryString = convertFiltersToQueryString(updatedFilters);

    const pathname = window.location.pathname;
    // Kết hợp chúng lại thành một URL hoàn chỉnh
    const fullUrl = pathname + "?" + queryString;

    // Chuyển hướng trình duyệt đến URL mới
    window.location.href = fullUrl;
  }

  return (
    <div className={clsx("col-span-2 hidden md:block p-4 mb-4", className)}>
      {/* Category Section */}
      <div className="font-semibold text-base text-gray-900 border-b mb-4 pb-4">
        <h3 className="text-xl font-semibold mb-2 capitalize">Category</h3>
        <ul className="ml-4">
          {categories.map((category: any) => (
            <li
              key={category.id}
              className={
                category.id === currentCategory.id
                  ? "text-black leading-6 mb-[6px]"
                  : "text-gray-500 leading-6 hover:underline mb-[6px]"
              }
            >
              <Link href={`/categories/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Filter Section */}
      <div className="font-semibold text-base text-gray-900 border-b pb-4 mb-4">
        <h3 className="text-xl font-semibold mb-2 capitalize">Filter</h3>
        <ul className="ml-4">
          <li className="flex items-center mb-2">
            <Checkbox
              id="pending"
              className="mr-2"
              checked={isChecked("status", "pending")}
              onCheckedChange={(checked) =>
                handleStatusChange("pending", checked)
              }
            />
            <label
              htmlFor="pending"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Pending
            </label>
          </li>
          <li className="flex items-center mb-2">
            <Checkbox
              id="active"
              className="mr-2"
              checked={isChecked("status", "active")}
              onCheckedChange={(checked) =>
                handleStatusChange("active", checked)
              }
            />
            <label
              htmlFor="active"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Active
            </label>
          </li>
          <li className="flex items-center mb-2 ">
            <Checkbox
              id="closed"
              className="mr-2"
              checked={isChecked("status", "closed")}
              onCheckedChange={(checked) =>
                handleStatusChange("closed", checked)
              }
            />
            <label
              htmlFor="closed"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              closed
            </label>
          </li>
        </ul>
      </div>

      {/* Condition Section */}
      <div className="font-semibold text-base text-gray-900">
        <h3 className="text-xl font-semibold mb-2 capitalize">Condition</h3>
        <ul className="ml-4">
          <li className="flex items-center mb-2">
            <Checkbox
              id="used"
              className="mr-2"
              checked={isChecked("condition", "used")}
              onCheckedChange={(checked) =>
                handleConditionChange("used", checked)
              }
            />
            <label
              htmlFor="used"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Used
            </label>
          </li>
          <li className="flex items-center mb-2">
            <Checkbox
              id="new"
              className="mr-2"
              checked={isChecked("condition", "new")}
              onCheckedChange={(checked) =>
                handleConditionChange("new", checked)
              }
            />
            <label
              htmlFor="new"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              New
            </label>
          </li>
          <li className="flex items-center mb-2">
            <Checkbox
              id="unbox"
              className="mr-2"
              checked={isChecked("condition", "unbox")}
              onCheckedChange={(checked) =>
                handleConditionChange("unbox", checked)
              }
            />
            <label
              htmlFor="unbox"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Unbox
            </label>
          </li>
          <li className="flex items-center mb-2">
            <Checkbox
              id="likenew"
              className="mr-2"
              checked={isChecked("condition", "likenew")}
              onCheckedChange={(checked) =>
                handleConditionChange("likenew", checked)
              }
            />
            <label
              htmlFor="likenew"
              className="text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Like New
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoriesSideBar;
