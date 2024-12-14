import { z } from "zod";
import { ResponeSchema } from "./standard.schema";

// Schema cho Auction
const Auction = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  images: z.array(z.string()),
});

// Schema cho từng phần tử trong mảng data
const InvoiceItem = z.object({
  id: z.number(),
  userID: z.string(),
  amount: z.number(),
  status: z.string(),
  paidAt: z.nullable(z.string()), // Có thể là null hoặc string
  paymentMethod: z.nullable(z.string()),
  address: z.nullable(z.string()),
  phoneNumber: z.nullable(z.string()),
  auction: Auction,
});
const InvoiceList = z.object({
  data: z.array(InvoiceItem),
  total: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
});
const InvoicesRes = ResponeSchema.extend({
  data: InvoiceList,
});

export type InvoiceItemType = z.TypeOf<typeof InvoiceItem>;
export type InvoicesResType = z.TypeOf<typeof InvoicesRes>;
export type InvoiceListType = z.TypeOf<typeof InvoiceList>;

// Xuất schema (nếu cần để validate)
export { InvoiceItem, InvoicesRes, InvoiceList };
export const InvoiceContactBody = z.object({
  phoneNumber: z.string(),
  address: z.string(),
});
export type InvoiceContactType = z.TypeOf<typeof InvoiceContactBody>;

export const InvoiceAdminItem = z.object({
  id: z.number(), // id là một số
  userID: z.string(), // userID là chuỗi
  amount: z.number(), // amount là số
  createdAt: z.string().refine((value) => !isNaN(Date.parse(value)), {
    message: "Invalid date format",
  }), // createdAt là chuỗi và phải là một ngày hợp lệ
  paymentMethod: z.string().nullable(), // paymentMethod có thể là null hoặc chuỗi
  address: z.string(), // address là chuỗi
  phoneNumber: z.string().length(10, "Phone number must be 10 digits"), // phoneNumber phải có độ dài 10 ký tự
  auction: z.object({
    name: z.string(), // auction.name là chuỗi
    slug: z.string(),
  }),
});
export type InvoiceAdminItemType = z.TypeOf<typeof InvoiceAdminItem>;

export const InvoiceAdminList = z.object({
  data: z.array(InvoiceAdminItem),
  total: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
});
export type InvoiceAdminListType = z.TypeOf<typeof InvoiceAdminList>;
export const InvoiceListAdminRes = ResponeSchema.extend({
  data: InvoiceAdminList,
});
export type InvoiceListAdminResType = z.TypeOf<typeof InvoiceListAdminRes>;
