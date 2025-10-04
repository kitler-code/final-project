import React from "react";
import { ProductDetaitls, productItem } from "@/types/productDetaitls.type";
import ProductDetailsCard from "@/app/_Component/ProductDetailsCard/ProductDetailsCard";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
  );
  const data: ProductDetaitls = await res.json();
  const product: productItem = data.data;
  return (
    <div>
      <ProductDetailsCard product={product} />
    </div>
  );
}
