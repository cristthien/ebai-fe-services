// Import necessary libraries and external components
// Import internal components
// Import styles
// Fetch or get data
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  className?: string;
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
}
function handlePrevious() {}
function handleNext() {}

const Pagination: React.FC<PaginationProps> = ({ className, pagination }) => {
  return (
    <div className={`flex flex-row justify-between mt-5 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={pagination.currentPage === 1} // Disable if on the first page
      >
        <ChevronLeft />
      </Button>
      <span className="font-semibold">
        {" "}
        {`${pagination?.currentPage} / ${pagination?.totalPages}`}
      </span>
      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={pagination?.currentPage === pagination?.totalPages} // Disable if on the last page
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
