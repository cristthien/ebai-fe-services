import { z } from "zod";
import { ResponeSchema } from "./standard.schema";

// Renaming auction item fields to be more descriptive
export const auctionItemSchema = z.object({
  id: z.string(), // Auction ID
  name: z.string(), // Auction name
  highestBid: z.number(), // Highest bid amount
  status: z.string(), // Auction status (e.g., 'active', 'closed')
  condition: z.string(), // Product condition (e.g., 'new', 'used')
  categoryName: z.string(), // Auction category name
  username: z.string(), // Username of the auction owner
  slug: z.string(), // Slug for URL generation
});

export const auctionListSchema = z.object({
  data: z.array(auctionItemSchema), // Rename data to 'items' for clarity
  totalCount: z.number(), // Renamed 'total' to 'totalCount'
  currentPage: z.number(), // Current page number
  totalPages: z.number(), // Total number of pages
});
export type AuctionListType = z.TypeOf<typeof auctionListSchema>;

// Renaming response schema to make it clearer
export const auctionListResponseSchema = ResponeSchema.extend({
  data: auctionListSchema,
});
export type AuctionListResponseType = z.TypeOf<
  typeof auctionListResponseSchema
>;
