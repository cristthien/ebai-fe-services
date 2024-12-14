import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};
export const parseJsonString = (jsonString: string) => {
  try {
    const parsedObject = JSON.parse(jsonString); // Chuyển chuỗi thành object
    return parsedObject;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null; // Hoặc giá trị mặc định nếu có lỗi
  }
};
export const isClient = () => typeof window !== "undefined";
export const calculateTimeLeft = (end_date: string) => {
  const now = new Date(); // Lấy thời gian hiện tại
  const end = new Date(end_date); // Chuyển end_date thành đối tượng Date

  const timeDifference = end.getTime() - now.getTime(); // Tính hiệu số giữa 2 thời điểm (ms)

  // Nếu thời gian đã qua, trả về thông báo
  if (timeDifference <= 0) return "Auction has ended";

  const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
  );
  const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

  return `${days} days ${hours} hours ${minutes} minutes left`;
};
export const ConvertImage = (src: string) => {
  return src.startsWith("http")
    ? src // Use directly if it's a valid URL
    : src.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_API_URL}${src}` // Concatenate directly if `src` starts with "/"
    : `${process.env.NEXT_PUBLIC_API_URL}/${src}`; // Add "/" if `src` doesn't start with it
};
export function formatCurrencyUSD(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}
export function convertFiltersToQueryString(filters: {
  status?: string[];
  condition?: string[];
}) {
  // Tạo mảng lưu trữ các tham số query string
  const queryParams: string[] = [];

  // Thêm bộ lọc status vào query string nếu có
  if (filters.status && filters.status.length > 0) {
    queryParams.push(`status=${filters.status.join(",")}`);
  }

  // Thêm bộ lọc condition vào query string nếu có
  if (filters.condition && filters.condition.length > 0) {
    queryParams.push(`condition=${filters.condition.join(",")}`);
  }

  // Trả về query string, nối các tham số bằng "&"
  return `${queryParams.join("&")}`;
}
