// Import library and external component
import ImageFrame from "@/components/ui/ImageFrame";
import { ProductType } from "@/schemaValidations/category.schema";

const ProductCard = ({ product }: { product: ProductType }) => {
  // Xác định URL của ảnh sản phẩm
  const imageUrl = product.images[0].startsWith("http")
    ? product.images[0] // Sử dụng trực tiếp nếu là URL hợp lệ
    : `${process.env.NEXT_PUBLIC_API_URL}/${product.images[0]}`; // Tạo URL đầy đủ nếu không phải URL
  const url = `/products/${product.slug}`;
  return (
    <a href={url} className="group w-full px-2">
      <div className="relative w-full">
        {/* Product Image with hover zoom effect */}
        <ImageFrame
          src={imageUrl} // Sử dụng URL được xử lý
          alt={product.name || "San Pham"} // Hiển thị tên sản phẩm hoặc fallback
          ImageClassName="object-contain"
          className="h-[200px] sm:h-[150px] md:h-[220px] w-full mx-auto bg-gray-200 border-inherit rounded-lg overflow-hidden"
          quality={100}
        />

        {/* Product Info with title visible, and details link appearing on hover */}
        <div className="bg-white bg-opacity-90 mt-2 transition-all duration-300 transform group-hover:-translate-y-3 px-2">
          <p
            className={`inline-block px-3 py-1 text-sm font-medium uppercase rounded-full ${
              product.status === "close"
                ? "bg-red-100 text-red-800"
                : product.status === "active"
                ? "bg-green-100 text-green-800"
                : product.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {product.status}
          </p>
          <h2 className="text-base font-medium text-[#191919] line-clamp-2">
            {product.name} {/* Hiển thị tên sản phẩm */}
          </h2>
          <p className="text-xl font-semibold mt-1">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.highest_bid)}{" "}
            {/* Format giá theo tiền tệ USD */}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
