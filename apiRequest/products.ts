// productApiRequest.ts
import http from "@/lib/http";
import {
  ProductReportListResType,
  ProductResType,
  ProductSearchResType,
  ProductTrayResType,
} from "@/schemaValidations/products.schema";
import { API_VERSION } from "./version";
const productApiRequest = {
  getDetail: (id: string) =>
    http.get<ProductResType>(`api/${API_VERSION}/auctions/${id}`),
  getNewListing: () =>
    http.get<ProductTrayResType>(`api/${API_VERSION}/auctions/new-listing`),
  explore: () =>
    http.get<ProductTrayResType>(`api/${API_VERSION}/auctions/explore`),
  createProduct: (body: any) =>
    http.post(`api/${API_VERSION}/auctions`, body, {
      baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    }),
  getSearch: (key: string) =>
    http.get<ProductSearchResType>(
      `api/${API_VERSION}/auctions/search?key=${key}`,
      {
        baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
      }
    ),
  getRelatedProducts: (id: number) =>
    http.get<ProductTrayResType>(`api/${API_VERSION}/categories/${id}/suggest`),
  getAuctionsByUserID: (id: number, page: number, limit: number) =>
    http.get<ProductReportListResType>(
      `api/${API_VERSION}/auctions/user/${id}?page=${page}&limit=${limit}`,
      {
        baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
      }
    ),
};

export default productApiRequest;
