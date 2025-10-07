import { product, ProductData } from "@/types/products.type";
import ProductCard from "./_Component/ProductCard/ProductCard";
import MainSlider from "./_Component/MainSlider/MainSlider";
import { Suspense } from "react";
import { HomeLoading } from "./_Component/HomeLoading/HomeLoading";

export default async function Home() {

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://ecommerce.routemisr.com";

  try {
    const res = await fetch(`${baseUrl}/api/v1/products`, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data: ProductData = await res.json();
    const productList: product[] = data.data || [];

    return (
      <>
        <MainSlider />
        <h1 className="text-2xl font-semibold my-4">Welcome Page</h1>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
          <Suspense fallback={<HomeLoading />}>
            {productList.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Suspense>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }
}
