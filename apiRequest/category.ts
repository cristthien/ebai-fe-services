import {
  CategoriesResType,
  CategoryResType,
  SpecificCategoryResType,
} from "@/schemaValidations/category.schema";
import http from "@/lib/http";
const categoryApiRequest = {
  //   getList: () => http.get<ProductListResType>("/products"),
  getAll: () => http.get<CategoriesResType>(`api/v1/categories/`),
  getSepecificCategory: (
    id: string,
    page: number,
    limit: number,
    query: string
  ) =>
    http.get<SpecificCategoryResType>(
      `api/v1/categories/${id}/auctions?page=${page}&limit=${limit}&${query}`
    ),
  create: (body: any) =>
    http.post<CategoryResType>("api/v1/categories", body, {
      baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    }),
};

export default categoryApiRequest;
