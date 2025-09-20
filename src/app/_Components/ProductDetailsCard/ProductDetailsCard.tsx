import React from "react";
import { productItem } from "@/types/productDetaitls.type";
import Image from "next/image";
import { Button } from "@/comvponents/ui/button";
import ProductSlider from "../ProductSlider/ProductSlider";
// import { ProductDetailsCard } from '@/app/_Components/ProductDetailsCard/ProductDetailsCard';
export default function ProductDetailsCard({
  product,
}: {
  product: productItem;
}) {
  const {
    imageCover,
    title,
    ratingsAverage,
    price,
    category: { name },
    _id,
    description,
    images,
  } = product;
  return (
    <div className="w-3/4 m-auto">
      <div className="grid grid-cols-12 justify-between items-center">
        <div className="col-span-3">
          {/* <Image src={imageCover} alt={title} width={200} height={100} className="w-full h-72 object-cover rounded-2xl" /> */}
          <ProductSlider images={images} />
        </div>
        <div className="col-span-7 mx-5">
          <h1>{title}</h1>
          <p>{description}</p>
          <h5 className="text-main my-5">{name}</h5>
          <div className="flex justify-between items-center">
            <span>{price}EGB</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {ratingsAverage}
            </span>
          </div>
          <Button className="rounded-2xl bg-main w-full mt-5">
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
