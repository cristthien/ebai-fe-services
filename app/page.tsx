import CategoryMenu from "@/components/Home/SuggestionCategory";
import MainLayout from "./layouts/main";
import Slider from "@/components/ui/Slider";
import SimilarProductTab from "@/components/common/SimilarProductTab";
import DiscountBanner from "@/components/Home/DiscountBanner";
import DiscoverBanner from "@/components/Home/DiscoverBanner";
import productApiRequest from "@/apiRequest/products";
import { ProductTrayType } from "@/schemaValidations/products.schema";

export default async function Home() {
  let newListingProduct: ProductTrayType | null = null;
  let exploreProduct: ProductTrayType | null = null;

  try {
    const newlistingRepone = await productApiRequest.getNewListing(); // Fetch dữ liệu từ API
    const exploreRepone = await productApiRequest.explore(); // Fetch dữ liệu từ API
    if (newlistingRepone?.data) {
      newListingProduct = newlistingRepone.data;
    }
    if (exploreRepone?.data) {
      exploreProduct = exploreRepone.data;
    }
  } catch (error: any) {
    console.error("Error fetching new listing products:", error.message);
  }

  return (
    <MainLayout>
      <div className="container mx-auto">
        <CategoryMenu />
        <Slider />
        {newListingProduct && newListingProduct.length > 0 ? (
          <SimilarProductTab
            titleTray="New Listing"
            subtitle="Recommend for you"
            products={newListingProduct}
            className="mt-8 "
          />
        ) : (
          <p className="text-center mt-8">
            No products available at the moment.
          </p>
        )}
        <DiscountBanner className="py-10 px-4" />
        {exploreProduct && exploreProduct.length > 0 ? (
          <SimilarProductTab
            titleTray="Explore"
            subtitle="Recommend for you"
            products={exploreProduct}
            className="mt-8 "
          />
        ) : (
          <p className="text-center mt-8">
            No products available at the moment.
          </p>
        )}
        <DiscoverBanner className="px-4 py-10" />
      </div>
    </MainLayout>
  );
}
