"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { product } from "@/types/products.type";
import ProductCard from "@/app/_Components/ProductCard/ProductCard";

export default function page() {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState<product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${id}`
        );
        const data = await res.json();
        setProduct(data.data); // ✅ adjust depending on your API response
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  return <ProductCard product={product} />;
}
