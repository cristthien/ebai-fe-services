// Import necessary libraries and external components
// Import internal components
// Import styles
// Fetch or get data
import { Button } from "../ui/button";
import ImageFrame from "../ui/ImageFrame";

interface DiscountBannerProps {
  className?: string;
}

const DiscoverBanner: React.FC<DiscountBannerProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex justify-between flex-col md:flex-row items-center p-6 bg-[#FFBD14] rounded-[16px] w-full max-h-[600px] ">
        {/* Phần text chiếm 60% */}
        <div className="md:flex-[4] flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-[#553B06]">
            Discover a kaleidoscope of cards
          </h1>
          <p className="text-base font-semibold my-1">
            Build your collection of trading cards and collectible card games.
          </p>
          <Button className="bg-[#553b06] mt-2 text-base text-[#FFBD14] font-semibold rounded-full py-3 px-5 w-fit">
            Shop products
          </Button>
        </div>

        {/* Phần hình ảnh chiếm 40% */}
        <div className=" flex[6] h-[300px] lg:h-[400px] w-[400px] lg:w-[600px] ">
          <ImageFrame
            className=" h-full p-8 w-full"
            src="/discovery-banner.png"
            alt="giathien"
            ImageClassName="object-contain h-full"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscoverBanner;
