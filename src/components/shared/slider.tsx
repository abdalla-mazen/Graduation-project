"use client"
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
export default function Slider() {
    const images = ["/images/slider-one.jpeg", "/images/slider-two.jpeg"];
  return <>
  
   <Carousel
    plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}>
  <CarouselContent >
    {images.map((src, index) => (
      <CarouselItem className='p-0' key={index} >
        <Card>
          <CardContent className='p-0'>
            <img src={src} alt={`slide-${index}`} className="w-full object-fill sm:h-[350px]" />
          </CardContent>
        </Card>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
  
  </>
}