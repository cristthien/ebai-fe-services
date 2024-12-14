import { ResponseSchemaType } from "@/schemaValidations/standard.schema";
import http from "@/lib/http";
import {
  InvoiceContactType,
  InvoiceListAdminResType,
  InvoicesResType,
} from "@/schemaValidations/invoice.schema";
import { API_VERSION } from "./version";

const invoiceApiRequest = {
  getInvoice: (page: number, limit: number) =>
    http.get<InvoicesResType>(
      `api/${API_VERSION}/invoices?page=${page}&limit=${limit}`,
      {
        baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
      }
    ),
  getInvoicebyAdmin: (page: number, limit: number) =>
    http.get<InvoiceListAdminResType>(
      `api/${API_VERSION}/invoices/admin?page=${page}&limit=${limit}`,
      {
        baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
      }
    ),
  updateInvoice(id: number, body: InvoiceContactType) {
    console.log(id, body);
    http.patch<ResponseSchemaType>(`api/${API_VERSION}/invoices/${id}`, body, {
      baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    });
  },
};

export default invoiceApiRequest;
