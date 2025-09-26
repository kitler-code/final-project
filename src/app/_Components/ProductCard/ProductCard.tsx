import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { product } from "@/types/products.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddCartBtn from "./AddCartBtn";
export default function ProductCard({ product }: { product: product }) {
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
  } = product;
  return (
    <Card className="bg-gray-300 border-0 shadow-md">
      <Link href={"/products/" + _id}>
        <CardHeader>
          <Image
            src={imageCover}
            alt={title}
            width={200}
            height={100}
            className="w-full h-72 object-cover rounded-2xl"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-main">Category</CardTitle>
          <CardTitle>{title.split(" ").slice(0, 2).join(" ")}</CardTitle>
          <div className="flex justify-between items-center">
            <span>{price}EGB</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {ratingsAverage}
            </span>
          </div>
          <p>Card Content</p>
        </CardContent>
      </Link>
      <CardFooter>
        <AddCartBtn id={_id} />
      </CardFooter>
    </Card>
  );
}
