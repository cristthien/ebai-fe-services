// Import necessary libraries and external components
// Import internal components
// (No internal components imported in this file)

import { Home } from "lucide-react";
import Link from "next/link";

// Import styles
// (No styles imported in this file)

// Fetch or get data
// (Data will be passed as props)

interface BreadCumbProps {
  className?: string;
  data: { label: string; link: string }[];
  productName: string;
}

const BreadCumb: React.FC<BreadCumbProps> = ({
  className,
  data,
  productName,
}) => {
  return (
    <div className={`text-sm text-[#707070] font-semibold ${className}`}>
      <Link href="/" className=" hover:underline cursor-pointer">
        <Home className="w-4 h-4 inline mr-1" />
        <span>Home</span>
      </Link>
      <span className="mx-2">/</span>
      <span className=" hover:underline cursor-pointer">
        <Link href={data[1].link}>{data[1].label}</Link>
      </span>
      <span className="mx-2">/</span>
      <Link href={data[1].link} className="font-medium">
        {productName}
      </Link>
    </div>
  );
};

export default BreadCumb;
