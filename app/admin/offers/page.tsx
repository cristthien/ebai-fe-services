"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { formatCurrencyUSD } from "@/lib/utils";
import { InvoiceAdminListType } from "@/schemaValidations/invoice.schema";
import invoiceApiRequest from "@/apiRequest/invoice";

const page = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1; // Default to 1 if 'page' is not a valid number
  const limit = Number(searchParams.get("limit")) || 5; // Default to 10 if 'limit' is not a valid number

  // Define state to store auctions data
  const [invoices, setInvoices] = useState<InvoiceAdminListType>();

  // Fetch auction data when the component mounts or search params change
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionsRes = await invoiceApiRequest.getInvoicebyAdmin(
          page,
          limit
        );
        setInvoices(auctionsRes.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, [page, limit]); // Re-fetch when page or limit changes

  return (
    <ContentLayout title="Invoices">
      <h1 className="text-xl font-bold leading-7">Invoices</h1>
      <p className="bids-description text-sm font-semibold text-gray-500">
        View and manage invoices.
      </p>
      <main className="w-full h-full p-4 mt-3 mb-3 border rounded-lg">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* ID Column */}
                <TableHead className="sticky left-0 z-0 min-w-[80px] bg-gray-50">
                  ID
                </TableHead>
                {/* Auction Name Column */}
                <TableHead className="min-w-[120px]">Name</TableHead>
                {/* Amount Column */}
                <TableHead>Amount</TableHead>
                {/* Created At Column */}
                <TableHead>Created At</TableHead>
                {/* Payment Method Column */}
                <TableHead>Payment Method</TableHead>
                {/* Address Column */}
                <TableHead className="min-w-[120px]">Address</TableHead>
                {/* Phone Number Column */}
                <TableHead>Phone Number</TableHead>
                {/* Status Column */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.data.map((auction) => (
                <TableRow key={auction.id}>
                  {/* ID */}
                  <TableCell className="sticky left-0 z-0 min-w-[100px] bg-gray-50">
                    {auction.id}
                  </TableCell>
                  {/* Auction Name */}
                  <TableCell className="min-w-[120px]">
                    <Link
                      href={`/products/${auction.auction.slug}`} // assuming auction has a slug field
                      className="text-blue-500 font-semibold text-sm uppercase hover:underline"
                    >
                      {auction.auction.name}
                    </Link>
                  </TableCell>
                  {/* Amount */}
                  <TableCell>{formatCurrencyUSD(auction.amount)}</TableCell>
                  {/* Created At */}
                  <TableCell>
                    {new Date(auction.createdAt).toLocaleString()}
                  </TableCell>
                  {/* Payment Method */}
                  <TableCell>{auction.paymentMethod || "N/A"}</TableCell>
                  {/* Address */}
                  <TableCell className="min-w-[120px]">
                    {auction.address}
                  </TableCell>
                  {/* Phone Number */}
                  <TableCell>{auction.phoneNumber}</TableCell>
                  {/* Status */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {invoices?.currentPage && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href={
                  invoices.currentPage > 1
                    ? `?page=${invoices.currentPage - 1}`
                    : "#"
                }
                className={
                  invoices.currentPage === 1
                    ? "cursor-not-allowed text-gray-400"
                    : ""
                }
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: invoices.totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?page=${index + 1}`}
                  className={`${
                    invoices.currentPage === index + 1
                      ? "border text-black"
                      : "text-gray-700"
                  } px-3 py-1 rounded-md`}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href={
                  invoices.currentPage < invoices.totalPages
                    ? `?page=${invoices.currentPage + 1}`
                    : "#"
                }
                className={
                  invoices.currentPage === invoices.totalPages
                    ? "cursor-not-allowed text-gray-400"
                    : ""
                }
              >
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </ContentLayout>
  );
};

export default page;
