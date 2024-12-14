import { z } from "zod";
// import { ResponeSchema } from "./standard.schema";
// export const User = z.object({
//   id: z.number(),
//   username: z.string(),
//   email: z.string().email(),
// });
// export const Bid = z.object({
//   id: z.number(),
//   amount: z.number(),
//   createdAt: z.string(), // Hoặc sử dụng z.date() nếu bạn muốn xử lý ngày giờ
//   auctionSlug: z.string(),
//   user: User,
// });

// export const BidsList = z.array(Bid);
// export const BidsListRes = ResponeSchema.extend({
//   data: BidsList,
// });
// // Tạo các type từ Zod schema
// export type UserType = z.TypeOf<typeof User>; // Type tương ứng với User schema
// export type BidType = z.TypeOf<typeof Bid>; // Type tương ứng với Bid schema
// export type BidsListType = z.TypeOf<typeof BidsList>; // Type tương ứng với BidsList schema
// export type BidsListResType = z.TypeOf<typeof BidsListRes>; // Type tương ứng với BidsListRes schema

export const Bid = z.object({
  username: z.string(),
  amount: z.number(),
  createdAt: z.string(), // Hoặc sử dụng z.date() nếu bạn muốn xử lý ngày giờ
});
export const BidList = z.object({
  highest_bid: z.number(),
  numOfBid: z.number(),
  bids: z.array(Bid),
});
export type BidListType = z.TypeOf<typeof BidList>;
