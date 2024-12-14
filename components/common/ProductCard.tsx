// Import library and external component
import { ProductItemType } from "@/schemaValidations/products.schema";
import ImageFrame from "@/components/ui/ImageFrame";

const ProductCard = ({ product }: { product: ProductItemType }) => {
  // Xác định URL của ảnh sản phẩm
  const imageUrl = product.image.startsWith("http")
    ? product.image // Sử dụng trực tiếp nếu là URL hợp lệ
    : `${process.env.NEXT_PUBLIC_API_URL}/${product.image}`; // Tạo URL đầy đủ nếu không phải URL
  const url = `/products/${product.slug}`;
  return (
    <a href={url} className="group w-full">
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
        <div className="bg-white bg-opacity-90 mt-2 transition-all duration-300 transform group-hover:-translate-y-3">
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
