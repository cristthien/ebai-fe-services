"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import the icons
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";
import ImageFrame from "@/components/ui/ImageFrame";
import { Button } from "@/components/ui/button";
import invoiceApiRequest from "@/apiRequest/invoice";
import { InvoiceListType } from "@/schemaValidations/invoice.schema";
import UpdateInvoiceForm from "./UpdateInvoiceModal";

interface invoicesProps {
  className?: string;
}

const Bids: React.FC<invoicesProps> = ({ className }) => {
  const [invoices, setInvoices] = useState<InvoiceListType | null>();

  const fetchinvoices = async (page: number) => {
    try {
      const reponse = await invoiceApiRequest.getInvoice(page, 5);

      if (reponse.statusCode != 200) {
        return <p>{reponse.message}</p>;
      }
      const invoiceRes = reponse.data;
      const invoiceList = invoiceRes.data;
      const refinedInvoiceList = invoiceList.map((item) => {
        const imageUrl = item.auction.images[0].startsWith("http")
          ? item.auction.images[0] // Sử dụng trực tiếp nếu là URL hợp lệ
          : `${process.env.NEXT_PUBLIC_API_URL}/${item.auction.images[0]}`; // Tạo URL đầy đủ nếu không phải URL
        item.auction.images = [imageUrl];
        return item;
      });
      setInvoices({
        ...invoiceRes,
        data: refinedInvoiceList,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchinvoices(1);
  }, []);

  const handlePrevious = async () => {
    try {
      if (invoices && invoices?.currentPage > 1) {
        // Ensure it's not the first page
        const nextPage = invoices.currentPage - 1;
        await fetchinvoices(nextPage);
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
      if (invoices && invoices.currentPage < invoices.totalPages) {
        // Ensure it's not the last page
        const nextPage = invoices.currentPage + 1;
        await fetchinvoices(nextPage);
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
      {invoices &&
        invoices.data.map((item, index) => (
          <Card key={index} className="mt-3">
            <CardContent className="flex flex-row mt-5 items-center ">
              {/* Product Image */}
              <ImageFrame
                src={item.auction.images[0]} // Sử dụng URL được xử lý
                alt={item.auction.name || "San Pham"} // Hiển thị tên sản phẩm hoặc fallback
                ImageClassName="object-contain"
                className="h-[200px] w-[200px] bg-gray-100 border rounded-lg aspect-square"
                quality={100}
              />

              {/* Product Details */}
              <div className="ml-6 mr-2 flex-1">
                <h2 className="text-sm font-semibold text-gray-400">
                  # {item.id}
                </h2>
                <h2 className="text-[18px] font-bold">{item.auction.name}</h2>
                <h3 className="text-2xl font-bold mt-3 flex">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(item.amount)}{" "}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {/* Payment Section */}
                  <div className="text-sm">
                    <p className="text-base font-semibold mb-1 text-gray-900 underline">
                      Payment:
                    </p>
                    <p>
                      <span className="text-gray-500">Status: </span>
                      <strong className="capitalize">{item.status}</strong>
                    </p>
                    <p className="mt-1">
                      <span className="text-gray-500">Method: </span>
                      <strong>
                        {item.paymentMethod ? item.paymentMethod : "Cashing"}
                      </strong>
                    </p>
                    <p className="mt-1">
                      <span className="text-gray-500">PaidAt: </span>
                      <strong>{item.paidAt ? item.paidAt : "Not Pay"}</strong>
                    </p>
                  </div>

                  {/* Contact Section */}
                  <div className="text-sm">
                    <p className="text-base font-semibold mb-2 text-gray-800 underline">
                      Contact:
                    </p>
                    <p>
                      <span className="text-gray-500">Phone Number: </span>
                      <strong>
                        {item.phoneNumber ? item.phoneNumber : "N/A"}
                      </strong>
                    </p>

                    <p className="mt-1">
                      <span className="text-gray-500">Address: </span>
                      <strong>
                        {item.address ? item.address : "No Address"}
                      </strong>
                    </p>
                  </div>
                </div>
                <div className="w-full mt-2">
                  <UpdateInvoiceForm
                    invoiceId={item.id}
                    invoicePhoneNumber={item.phoneNumber}
                    invoiceAddress={item.address}
                  />
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
          disabled={invoices?.currentPage === 1} // Disable if on the first page
        >
          <ChevronLeft />
        </Button>
        <span className="font-semibold">
          {" "}
          {`${invoices?.currentPage} / ${invoices?.totalPages}`}
        </span>
        {/* Next Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={invoices?.currentPage === invoices?.totalPages} // Disable if on the last page
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Bids;
