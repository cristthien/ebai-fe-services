"use client";
// Import the library
import Link from "next/link";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

// Import the file and component
import ImageFrame from "@/components/ui/ImageFrame";

type CarouselItemData = {
  leftContent: string;
  banner: string;
  rightContent: string;
  leftSubcontent: string;
  rightSubcontent: string;
  href: string;
};
type CaroselItemRenderProps = {
  className?: string;
  data: CarouselItemData[];
};

// Import style
// Get Data

const data = [
  {
    banner: "/slider1.png",
    leftContent: "Vô Cùng Mạnh Mẽ",
    leftSubcontent: "Iphone 16 Pro",
    rightSubcontent: "Làm việc mọi nơi",
    rightContent: "Mỏng Hơn. Đỉnh Hơn",
    href: "/categories/41",
  },
  {
    banner: "/slider2.png",
    leftContent: "Dễ dàng sở hữu",
    leftSubcontent: "Ipad Air m2 ",
    rightSubcontent: "Học tập phi thường",
    rightContent: "Vô cùng mạnh mẽ",
    href: "/categories/25",
  },
  {
    banner: "/slider3.png",
    leftContent: "Siêu Mạnh Mẽ với M4 chip",
    leftSubcontent: "Macbook 16inch Pro",
    rightContent: "Làm việc năng xuất",
    rightSubcontent: "Đẹp Biểu Tượng",
    href: "/categories/21",
  },
];

export default function Slider() {
  const plugin = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Carousel
      className="relative w-full container mx-auto px-6"
      opts={{ loop: true }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CaroselItems data={data} />
      <CarouselPrevious className="absolute left-4 z-10 p-4 rounded-full shadow-lg hover:bg-dark transition-colors duration-200 flex items-center justify-center"></CarouselPrevious>
      <CarouselNext className="absolute right-4 z-10 p-4 rounded-full shadow-lg hover:bg-dark transition-colors duration-200 flex items-center justify-center"></CarouselNext>
    </Carousel>
  );
}
function CaroselItems({ className, data }: CaroselItemRenderProps) {
  return (
    <CarouselContent className={`${className}`}>
      {data.map((item, index) => (
        <CarouselItem key={index}>
          <div className="h-[500px]">
            <Card className=" w-full h-full px-2">
              <Link href={item.href || "#"} className=" w-full h-full">
                <CardContent className="flex items-center h-full justify-center flex-col md:flex-row py-6 md:py-3 md:px-10">
                  <div className="  text-blue-600/100  w-[300px] sm:w-[400px] ">
                    <h3 className="capitalize text-4xl font-bold md:text-5xl ">
                      {item.leftContent}
                    </h3>
                    <p className="text-base font-semibold">
                      {item.leftSubcontent}
                    </p>
                  </div>
                  <ImageFrame
                    className=" h-full w-full mx-2"
                    src={item.banner}
                    alt={item.banner}
                    ImageClassName="object-contain"
                    quality={100}
                  />
                  <div className="text-blue-600/100 w-[300px] sm:w-[400px]">
                    <h3 className="capitalize text-4xl font-bold md:text-5xl ">
                      {item.rightContent}
                    </h3>
                    <p className="text-base font-semibold">
                      {item.rightSubcontent}
                    </p>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}
