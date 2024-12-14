import MainLayout from "@/app/layouts/main";
import ProductWrapper from "./components/ProductWrapper";
import BreadCumb from "./components/BreadCumb";
import SimilarProductTab from "@/components/common/SimilarProductTab";
import productApiRequest from "@/apiRequest/products";
import {
  ProductResType,
  ProductTrayResType,
} from "@/schemaValidations/products.schema";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { ConvertImage } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  // Lấy thông tin sản phẩm
  const response: ProductResType = await productApiRequest.getDetail(id);

  if (response.statusCode === 404) {
    redirect("/");
  } else if (response.statusCode !== 200) {
    throw new Error(response.message);
  }

  const productDetail = response.data;

  return {
    title: `${productDetail.name}`,
    description: productDetail.description || "Discover amazing products.",
    openGraph: {
      title: productDetail.name,
      description: productDetail.description,
      url: `${process.env.NEXT_PUBLIC_URL}/product/${productDetail.slug}`,
      siteName: "eBai",
      images: [
        {
          url: ConvertImage(productDetail.images[0]), // URL ảnh từ API
          width: 1200,
          height: 630,
          alt: productDetail.name,
        },
      ],
      locale: "en_US",
      type: "website", // Sử dụng "website" thay vì "product"
    },
    twitter: {
      card: "summary_large_image",
      title: productDetail.name,
      description: productDetail.description,
      images: [ConvertImage(productDetail.images[0])],
    },
  };
}

export default async function Page({ params }: Props) {
  const id = (await params).id;
  // Lấy thông tin chi tiết sản phẩm từ API
  const respone: ProductResType = await productApiRequest.getDetail(id);

  if (respone.statusCode == 404) {
    redirect("/");
  } else if (respone.statusCode != 200) {
    throw new Error(respone.message);
  }
  const productDetail = respone.data;
  const { category } = productDetail;
  let relatedProducts = null;
  const relatedProductsRes: ProductTrayResType =
    await productApiRequest.getRelatedProducts(category.id);
  if (relatedProductsRes?.data) {
    relatedProducts = relatedProductsRes.data;
  }
  const breadcumbData = [
    { label: "Trang chủ", link: "/" },
    {
      label: category.name,
      link: `/categories/${category.id}`,
    },
  ];
  return (
    <MainLayout>
      <div className="container mx-auto">
        <BreadCumb
          className="mb-5 mt-4 ml-6"
          data={breadcumbData}
          productName={productDetail.name}
        ></BreadCumb>
        <ProductWrapper
          className="container mx-auto"
          productDetail={productDetail}
        ></ProductWrapper>
        {relatedProducts && relatedProducts.length > 0 ? (
          <SimilarProductTab
            titleTray="Explore"
            subtitle="Recommend for you"
            products={relatedProducts}
            className="mt-8 ml-6 mb-5"
          />
        ) : (
          <p className="text-center mt-8 ">
            No products available at the moment.
          </p>
        )}
      </div>
    </MainLayout>
  );
}
