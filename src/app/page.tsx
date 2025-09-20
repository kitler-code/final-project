import { product, ProductData } from "@/types/products.type";
import ProductCard from "./_Components/ProductCard/ProductCard";
import MainSlider from "./_Components/MainSlider/MainSlider";
import { Suspense } from "react";
import { HomeLoading } from "./_Components/HomeLoading/HomeLoading";

export default async function Home() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  const data: ProductData = await res.json();
  const productLitst: product[] = data.data;
  return (
    <>
      <MainSlider />
      <h1>Welcome Page</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        <Suspense fallback={<HomeLoading />}>
          {productLitst.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </Suspense>
      </div>
    </>
  );
}
