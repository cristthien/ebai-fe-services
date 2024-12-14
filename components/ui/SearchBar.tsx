"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import productApiRequest from "@/apiRequest/products";
import { ProductSearchListType } from "@/schemaValidations/products.schema";
import ImageFrame from "./ImageFrame";
import { ConvertImage } from "@/lib/utils";
import Link from "next/link";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState(""); // Sử dụng 1 state chung cho cả 2 input
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [results, setResults] = useState<ProductSearchListType>([]); // Kết quả trả về

  const handleSearch = () => {
    if (searchValue.trim()) {
      handleFetchResults();
      setIsDialogOpen(true); // Mở dialog
    } else {
      alert("Please enter a search term.");
    }
  };

  const handleFetchResults = async () => {
    const trimmedValue = searchValue.trim(); // Sử dụng searchValue thay vì dialogSearchValue

    if (!trimmedValue) return;

    try {
      // Mã hóa chuỗi tìm kiếm để xử lý các ký tự đặc biệt
      const encodedSearchValue = encodeURIComponent(trimmedValue);

      // Giả sử bạn có ProductApiRequest.search để gọi API
      const response = await productApiRequest.getSearch(encodedSearchValue);
      if (response && response.data) {
        setResults(response.data); // Cập nhật kết quả trả về
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(); // Gọi hàm tìm kiếm khi người dùng nhấn Enter
    }
  };

  return (
    <div>
      {/* Thanh tìm kiếm */}
      <div className="flex items-center justify-between hidden min-[350px]:flex w-[230px] md:w-[360px] shadow-md rounded-full bg-white border border-gray-300">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} // Cập nhật giá trị của searchValue
          placeholder="Search for anything"
          onKeyDown={handleKeyDown}
          className="p-2 pl-3 flex-grow text-sm text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-full"
        />
        <button
          onClick={handleSearch} // Lắng nghe sự kiện nhấn nút
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3665f3] text-white hover:bg-blue-700 focus:outline-none m-1"
          aria-label="Search"
        >
          <Search size={20} /> {/* Kích thước biểu tượng */}
        </button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[90vw] md:max-w-xl min-w-[320px] h-[500px] max-h-[80vh] border border-white rounded-lg">
          <DialogHeader>
            <DialogTitle>Search products</DialogTitle>
          </DialogHeader>

          {/* Tạo khu vực chứa thanh tìm kiếm */}
          <div className="w-full my-2">
            <div className="flex items-center w-full shadow-md rounded-full bg-white border border-gray-300">
              <input
                type="text"
                value={searchValue} // Dùng chung searchValue
                onChange={(e) => setSearchValue(e.target.value)} // Cập nhật searchValue
                onKeyDown={handleKeyDown}
                placeholder="Search for anything"
                className="p-2 pl-3 flex-grow text-sm text-gray-700 placeholder-gray-400 focus:outline-none rounded-l-full"
              />
              <button
                onClick={handleSearch} // Lắng nghe sự kiện nhấn nút
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#3665f3] text-white hover:bg-blue-700 focus:outline-none m-1"
                aria-label="Search"
              >
                <Search size={20} /> {/* Kích thước biểu tượng */}
              </button>
            </div>
          </div>

          {/* Phần chứa kết quả */}
          <div className="w-full mt-3 overflow-y-auto min-h-[310px]  min-h-[400px]">
            {/* Thêm max-h để giới hạn chiều cao của khu vực kết quả */}
            {results.length > 0 ? (
              results.map((item, index) => (
                <Link key={index} href={`products/${item.slug}`}>
                  <div className="flex mt-2">
                    <ImageFrame
                      src={ConvertImage(item.image)} // Sử dụng URL được xử lý
                      alt={item.name || "San Pham"} // Hiển thị tên sản phẩm hoặc fallback
                      ImageClassName="object-contain"
                      className="h-[80px] w-[80px] bg-gray-100 border rounded-lg aspect-square"
                      quality={100}
                    />
                    <p className="text-sm font-semibold ml-2">{item.name}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 h-[310px] ">
                No results found
              </p> // Hiển thị khi không có kết quả
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;
