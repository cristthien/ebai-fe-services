import { z } from "zod";
import { ResponeSchema } from "@/schemaValidations/standard.schema";
// User Schema for user data
const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});

// Category Schema for product category
const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

// The schema for the 'data' part of the response, in this case, product data
const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
  brand: z.string().nullable(),
  model: z.string().nullable(),
  condition: z.string(),
  price: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  starting_bid: z.string(),
  highest_bid: z.string(),
  bid_count: z.number(),
  specifications: z.string(),
  images: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string(),
  status: z.string(),
  category: categorySchema,
  user: userSchema,
});

// General schema for the API response that wraps the product data and includes statusCode and message
const ProductRes = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: productSchema, // In this case, data is a product
});

export type ProductResType = z.TypeOf<typeof ProductRes>;
// Định nghĩa kiểu sản phẩm (item)
const ProductItem = z.object({
  name: z.string(),
  highest_bid: z.number(),
  image: z.string(),
  slug: z.string(),
});
export type ProductItemType = z.TypeOf<typeof ProductItem>;

// Định nghĩa kiểu danh sách sản phẩm (tray)
const ProductTray = z.array(ProductItem);
export type ProductTrayType = z.TypeOf<typeof ProductTray>;

// Định nghĩa kiểu response chứa tray
const ProductTrayRes = ResponeSchema.extend({
  data: ProductTray,
});
export type ProductTrayResType = z.TypeOf<typeof ProductTrayRes>;

const ProductReportItem = z.object({
  name: z.string(),
  highest_bid: z.number(),
  image: z.string(),
  slug: z.string(),
  id: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});
export type ProductReportItemType = z.TypeOf<typeof ProductReportItem>;

// Define the ProductReportList schema
const ProductReportList = z.object({
  data: z.array(ProductReportItem), // Array of ProductReportItem
  total: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
});
export type ProductReportListType = z.TypeOf<typeof ProductReportList>;

const ProductReportListRes = ResponeSchema.extend({
  data: ProductReportList,
});
export type ProductReportListResType = z.TypeOf<typeof ProductReportListRes>;
const ProductSearchList = z.array(
  z.object({
    name: z.string(),
    slug: z.string(),
    image: z.string(),
  })
);
export type ProductSearchListType = z.TypeOf<typeof ProductSearchList>;

export const ProductSearchRes = ResponeSchema.extend({
  data: ProductSearchList,
});
export type ProductSearchResType = z.TypeOf<typeof ProductSearchRes>;
