"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function MainSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 2000,
  };
  return (
    <div className="grid grid-cols-12 my-6">
      <div className="col-span-10">
        <Slider {...settings}>
          <div>
            <Image
              src="/images/slider-image-1.jpeg"
              alt="img1"
              width={1000}
              height={1000}
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-2.jpeg"
              alt="img2"
              width={1000}
              height={1000}
              className="w-full h-96 object-cover"
            />
          </div>
          <div>
            <Image
              src="/images/slider-image-3.jpeg"
              alt="img3"
              width={1000}
              height={1000}
              className="w-full h-96 object-cover"
            />
          </div>
        </Slider>
      </div>
      <div className="container col-span-2">
        <div>
          <Image
            src="/images/slider-image-2.jpeg"
            alt="img2"
            width={800}
            height={400}
            className="object-contain mx-auto"
          />
        </div>
        <div>
          <Image
            src="/images/slider-image-2.jpeg"
            alt="img2"
            width={800}
            height={400}
            className="object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
