import React from "react";
import { product } from "@/types/products.type";
import { ProductDetaitls, productItem } from "@/types/productDetaitls.type";
import ProductDetailsCard from "@/app/_Components/ProductDetailsCard/ProductDetailsCard";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const data: ProductDetaitls = await res.json();
  const product: productItem = data.data;
  return (
    <div>
      <ProductDetailsCard product={product} />
    </div>
  );
}
