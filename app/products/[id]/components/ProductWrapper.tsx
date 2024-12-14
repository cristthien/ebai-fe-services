// Import necessary libraries and external components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Divider from "@/components/ui/Divider";
import ImageFrame from "@/components/ui/ImageFrame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import BiddingComponent from "./BiddingComponent";
// Import internal components
// Import styles
// Fetch or get data

interface ProductWrapperProps {
  className?: string;
  productDetail: any;
}

type Specification = {
  key: string;
  value: string;
};

const ProductWrapper: React.FC<ProductWrapperProps> = ({
  className,
  productDetail,
}) => {
  const images = productDetail.images;
  const updateImages = images.map((value: string) => {
    if (value.startsWith("http")) {
      // If the URL starts with "http", return the value as is
      return value;
    } else if (value.startsWith("public")) {
      // If the URL starts with "public", prepend the API URL
      return `${process.env.NEXT_PUBLIC_API_URL}/${value}`;
    }
    // Return the value as is if it doesn't start with "http" or "public"
    return value;
  });

  const specifications = productDetail.specifications
    ? (JSON.parse(productDetail.specifications) as Specification[])
    : null;
  const { user } = productDetail;

  return (
    <div className={className}>
      <div className="flex flex-col md:flex-row ">
        {/* Left section: Images */}
        <div className="px-4 w-full h-full md:w-2/3 lg:w-1/2 ">
          <ImageTabs images={updateImages}></ImageTabs>
        </div>

        {/* Right section: Product details */}
        <div className=" md:w-1/3 lg:w-1/2 p-4">
          <h1 className="font-semibold text-xl">{productDetail.name}</h1>
          <div className="flex items-center mb-4 mt-3 rounded-full">
            <ImageFrame
              src={
                user.image
                  ? user.image`${process.env.NEXT_PUBLIC_API_URL}/${user.image}`
                  : "/avatar.jpg"
              }
              alt="San Pham Son Lotus"
              ImageClassName="object-contain "
              className="h-[50px] w-[50px] inline-block mr-3 rounded-full overflow-hidden"
              quality={100}
            />
            <div className="">
              <Link href="#" className="underline font-semibold">
                {`${user.username} `}
                <span className="text-[#707070]">(27)</span>
              </Link>
              <p>100% positive</p>
            </div>
          </div>
          <Divider className="h-[1px] w-[100%] bg-gray-300 " />
          <BiddingComponent
            end_date={productDetail.end_date}
            productSlug={productDetail.slug}
            className=""
          />
        </div>
      </div>
      <Card className="mx-4 mt-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold ">Description</CardTitle>
        </CardHeader>
        <CardContent>{productDetail.description}</CardContent>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            About This Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          {specifications && specifications.length > 0 && (
            <table className="min-w-full table-auto ">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Specification</th>
                  <th className="px-4 py-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 font-semibold capitalize">
                      {spec.key}
                    </td>
                    <td className="px-4 py-2 capitalize">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductWrapper;
function ImageTabs({ images }: { images: string[] }) {
  return (
    <Tabs className="w-full h-full " defaultValue="image0">
      {images.map((value: string, i: number) => {
        return (
          <TabsContent
            className="w-full h-full bg-[#e5e5e5] rounded-lg"
            key={i}
            value={`image${i}`}
          >
            <ImageFrame
              src={value}
              alt="San Pham Son Lotus"
              ImageClassName="object-contain "
              className="h-[450px] w-full bg-gray  "
              quality={100}
            />
          </TabsContent>
        );
      })}

      <TabsList className="mt-2 overflow-x-auto no-scrollbar rounded-lg whitespace-nowrap h-fit w-full bg-white">
        {images.map((value: string, i: number) => {
          return (
            <TabsTrigger
              className=" p-0 mx-2 rounded-lg border border-white data-[state=active]:border-black bg-[#e5e5e5] overflow-hidden"
              key={i}
              value={`image${i}`}
            >
              <ImageFrame
                src={value}
                alt="San Pham Son Lotus"
                ImageClassName="object-contain "
                className="h-20 w-20 bg-[#e5e5e5] rounded-lg   "
                quality={100}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
