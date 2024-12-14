// Import necessary libraries and external components
// Import internal components
// Import styles
// Fetch or get data

import Link from "next/link";
import { Button } from "../ui/button";

interface DiscountBannerProps {
  className?: string;
}

const DiscountBanner: React.FC<DiscountBannerProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex justify-between flex-col md:flex-row items-center p-6 bg-[#FFBD14] rounded-[16px] ">
        <div className="">
          <h1 className="text-2xl font-bold text-[#553B06]">
            Save on cards before they are gone
          </h1>
          <p className="text-sm font-semibold my-1">
            Use code TCGIFT24 on your favorite collectible and game cards.
          </p>
          <Link href="#" className="underline text-sm">
            Ends Nov 19. Min. spend $50. Max. $30 off. T&Cs.
          </Link>
        </div>
        <Button className="bg-[#553b06] mt-2 md:mt-0 text-base text-[#FFBD14] font-semibold rounded-full py-3 px-5">
          Shop products
        </Button>
      </div>
    </div>
  );
};

export default DiscountBanner;
