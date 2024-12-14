import { z } from "zod";
// Schema cho phần dữ liệu chung
export const ResponeSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.unknown(), // Sử dụng z.unknown() để có thể linh hoạt thay đổi loại dữ liệu bên trong 'data'
});
export type ResponseSchemaType = z.TypeOf<typeof ResponeSchema>;
