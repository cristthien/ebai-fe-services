// Import the library

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
// Import the file and component
import ProductCard from "./ProductCard";
import { ProductTrayType } from "@/schemaValidations/products.schema";

export default function SimilarProductTab({
  className,
  products,
  titleTray,
  subtitle,
}: {
  className?: string;
  products: ProductTrayType;
  titleTray: string;
  subtitle?: string;
}) {
  return (
    <div className={className}>
      <div className="ml-3">
        <h2 className="leading-7 font-bold text-2xl">{titleTray}</h2>
        <p className="text-xs">{subtitle}</p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="h-full mt-4 md:mt-4 px-6"
      >
        <CarouselContent className="h-full flex">
          {products.map((product, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/4 lg:basis-1/5"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 z-10 p-4 text-gray-800 bg-dark rounded-full shadow-lg hover:bg-dark transition-colors duration-200 flex items-center justify-center"></CarouselPrevious>
        <CarouselNext className="absolute right-0 z-10 p-4 text-gray-800 bg-dark rounded-full shadow-lg hover:bg-dark transition-colors duration-200 flex items-center justify-center"></CarouselNext>
      </Carousel>
    </div>
  );
}
