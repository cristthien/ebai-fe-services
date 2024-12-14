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
import auctionApiRequest from "@/apiRequest/auction";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { AuctionListType } from "@/schemaValidations/auction.schema";
import { formatCurrencyUSD } from "@/lib/utils";

const page = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1; // Default to 1 if 'page' is not a valid number
  const limit = Number(searchParams.get("limit")) || 5; // Default to 10 if 'limit' is not a valid number

  // Define state to store auctions data
  const [auctions, setAuctions] = useState<AuctionListType>();

  // Fetch auction data when the component mounts or search params change
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const auctionsRes = await auctionApiRequest.getAll(page, limit);
        setAuctions(auctionsRes.data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchAuctions();
  }, [page, limit]); // Re-fetch when page or limit changes

  return (
    <ContentLayout title="Bids">
      <h1 className="text-xl font-bold leading-7">Bids</h1>
      <p className="bids-description text-sm font-semibold text-gray-500">
        View and manage products with active bids. Stay updated on bidding
        activity.
      </p>
      <main className="w-full h-full p-4 mt-3 mb-3 border rounded-lg">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-0 min-w-[120px] bg-gray-50">
                  Name
                </TableHead>
                <TableHead>Highest Bid</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auctions?.data.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell className="sticky left-0 z-0 min-w-[120px] bg-gray-50">
                    <Link
                      href={`/products/${auction.slug}`}
                      className="text-blue-500 font-semibold text-sm uppercase hover:underline"
                    >
                      {auction.name}
                    </Link>
                  </TableCell>
                  <TableCell>{formatCurrencyUSD(auction.highestBid)}</TableCell>
                  <TableCell>{auction.categoryName}</TableCell>
                  <TableCell>{auction.username}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-sm font-semibold ${
                        auction.status === "active"
                          ? "bg-green-100 text-green-700"
                          : auction.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {auction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      {auctions?.currentPage && (
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href={
                  auctions.currentPage > 1
                    ? `?page=${auctions.currentPage - 1}`
                    : "#"
                }
                className={
                  auctions.currentPage === 1
                    ? "cursor-not-allowed text-gray-400"
                    : ""
                }
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>

            {/* Page Numbers */}
            {Array.from({ length: auctions.totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`?page=${index + 1}`}
                  className={`${
                    auctions.currentPage === index + 1
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
                  auctions.currentPage < auctions.totalPages
                    ? `?page=${auctions.currentPage + 1}`
                    : "#"
                }
                className={
                  auctions.currentPage === auctions.totalPages
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
