import { z } from "zod";
import { ResponeSchema } from "./standard.schema";

// Define the zod schema for the CreateCategoryBody
export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"), // Ensure name is a non-empty string
  description: z.string().min(1, "Description is required"), // Ensure description is a non-empty string
  thumbnail: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"), // Ensure the image is a non-empty File
});

// Use zod to infer the TypeScript type from the schema
export type CreateCategoryBodyType = z.TypeOf<typeof createCategorySchema>;
// Data type for the category
export const CategoryData = z.object({
  name: z.string(),
  description: z.string(),
  thumbnail: z.string(), // The path to the image (string)
  id: z.number(), // The category ID
});
export type CategoryType = z.TypeOf<typeof CategoryData>;
export const CategoryList = z.array(CategoryData);
export type CategoryListType = z.TypeOf<typeof CategoryList>;

export const CategoryRes = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: CategoryData, // In this case, data is a product
});
export type CategoryResType = z.TypeOf<typeof CategoryRes>;

export const CategoriesRes = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.array(CategoryData), // In this case, data is a product
});
export type CategoriesResType = z.TypeOf<typeof CategoriesRes>;
export const Product = z.object({
  name: z.string(),
  slug: z.string(),
  highest_bid: z.number(),
  images: z.array(z.string()),
  status: z.string(),
});
export type ProductType = z.TypeOf<typeof Product>;
export const SpecificCategoryRes = ResponeSchema.extend({
  data: z.object({
    category: CategoryData,
    auctions: z.object({
      data: z.array(Product),
      total: z.number(),
      currentPage: z.number(),
      totalPages: z.number(),
    }),
  }),
});
export type SpecificCategoryResType = z.TypeOf<typeof SpecificCategoryRes>;
