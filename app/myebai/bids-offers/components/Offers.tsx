"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import the icons
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import productApiRequest from "@/apiRequest/products";
import { ProductReportListType } from "@/schemaValidations/products.schema";
import ImageFrame from "@/components/ui/ImageFrame";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OffersProps {
  className?: string;
}

const Offers: React.FC<OffersProps> = ({ className }) => {
  const [offers, setOffers] = useState<ProductReportListType | null>();
  const fetchOffers = async (page: number) => {
    try {
      const reponse = await productApiRequest.getAuctionsByUserID(-1, page, 5);
      if (reponse.statusCode != 200) {
        return <p>{reponse.message}</p>;
      }
      const offerRes = reponse.data;
      const offerList = offerRes.data;
      const refinedOfferList = offerList.map((item) => {
        const imageUrl = item.image.startsWith("http")
          ? item.image // Sử dụng trực tiếp nếu là URL hợp lệ
          : `${process.env.NEXT_PUBLIC_API_URL}/${item.image}`; // Tạo URL đầy đủ nếu không phải URL
        return {
          ...item,
          image: imageUrl,
        };
      });

      setOffers({
        ...offerRes,
        data: refinedOfferList,
      });
    } catch (e: any) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchOffers(1);
  }, []);

  // Function to format a date string into "DD/MM/YYYY"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const handlePrevious = async () => {
    try {
      if (offers && offers?.currentPage > 1) {
        // Ensure it's not the first page
        const nextPage = offers.currentPage - 1;
        await fetchOffers(nextPage);
      } else {
        console.warn("Already on the first page."); // Optional warning
      }
    } catch (error) {
      console.error("Error fetching the previous page:", error);
      alert(
        "An error occurred while fetching the previous page. Please try again."
      );
    }
  };

  // Function to go to the next page
  const handleNext = async () => {
    try {
      if (offers && offers.currentPage < offers.totalPages) {
        // Ensure it's not the last page
        const nextPage = offers.currentPage + 1;
        await fetchOffers(nextPage);
      } else {
        console.warn("Already on the last page."); // Optional warning
      }
    } catch (error) {
      console.error("Error fetching the next page:", error);
      alert(
        "An error occurred while fetching the next page. Please try again."
      );
    }
  };
  return (
    <div className={clsx(className, "w-full")}>
      {offers &&
        offers.data.map((item, index) => (
          <Card key={index} className="mt-3">
            <CardContent className="flex flex-row mt-5 items-center ">
              {/* Product Image */}
              <ImageFrame
                src={item.image} // Sử dụng URL được xử lý
                alt={item.name || "San Pham"} // Hiển thị tên sản phẩm hoặc fallback
                ImageClassName="object-contain"
                className="h-[200px] w-[200px] bg-gray-100 border rounded-lg aspect-square"
                quality={100}
              />

              {/* Product Details */}
              <div className="ml-5 mr-1 flex-1">
                <h2 className="text-base font-bold">{item.name}</h2>
                <h3 className="text-[18px] font-bold mt-2 flex">
                  <p className="text-gray-500 font-semibold mr-2"> Price: </p>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.highest_bid)}{" "}
                </h3>

                {/* Dates in Two Columns */}
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Start Date:
                    </p>
                    <p className="text-sm font-semibold">
                      {formatDate(item.start_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      End Date:
                    </p>
                    <p className="text-sm font-semibold">
                      {formatDate(item.end_date)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-row justify-end">
                  <Button
                    variant={"outline"}
                    className="m-2 rounded-full px-7 py-5 font-semibold"
                    disabled={true}
                  >
                    Update
                  </Button>
                  <Button
                    className="m-2 bg-[#3665F3] hover:bg-[#3665F3] hover:opacity-80 px-8 py-5  font-semibold rounded-full "
                    asChild
                  >
                    <Link href={`/products/${item.slug}`}> Detail</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      <div className="flex flex-row justify-between mt-5">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={offers?.currentPage === 1} // Disable if on the first page
        >
          <ChevronLeft />
        </Button>
        <span className="font-semibold">
          {" "}
          {`${offers?.currentPage} / ${offers?.totalPages}`}
        </span>
        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={offers?.currentPage === offers?.totalPages} // Disable if on the last page
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Offers;
