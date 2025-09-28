"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import "@/styles/running-border.css";
import { useState } from "react";

export default function ProductListingSection() {
  const productImages = [
    { src: "bio_product_1.jpg", category: "PARAPHEROMONES" },
    { src: "bio_product_2.jpg", category: "PARAPHEROMONES" },
    { src: "bio_product_3.jpg", category: "PARAPHEROMONES" },
    { src: "bio_product_4.jpg", category: "PARAPHEROMONES" },
    { src: "bio_product_5.jpg", category: "PARAPHEROMONES" },
    { src: "bio_product_6.jpg", category: "PARAPHEROMONES" },
    { src: "bio_product_7.jpg", category: "KAIROMONES" },
    { src: "bio_product_8.jpg", category: "KAIROMONES" },
    { src: "bio_product_9.jpg", category: "TRAP SYSTEMS" },
  ];

  const [selectedFilter, setSelectedFilter] = useState("ALL");

  const filteredProducts =
    selectedFilter === "ALL"
      ? productImages
      : productImages.filter((p) => p.category === selectedFilter);

  const carouselAlign = filteredProducts.length <= 2 ? "center" : "start";

  return (
    <section className="w-full -mt-10">
      <div className="w-full bg-gray-500/50 rounded-xl shadow-md flex flex-col gap-6 p-6 md:p-10">
        {/* Hero Banner */}
        <div className="w-full">
          <div className="hidden lg:flex relative w-full h-[300px] md:h-[400px] lg:h-[500px] 2xl:h-[600px] items-center justify-center overflow-hidden rounded-lg">
            <h1 className="absolute text-[70px] sm:text-[110px] md:text-[190px] lg:text-[190px] xl:text-[250px] 2xl:text-[320px] font-extrabold text-gray-200/50 tracking-wide z-0 select-none">
              BIOORGO
            </h1>
            <h3 className="relative z-10 text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-600 text-center">
              Chemically Ecological Products
            </h3>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4 lg:hidden">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
              BIOORGO
            </h1>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-600 text-center">
              Chemically Ecological Products
            </h3>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-4 justify-center">
          {["ALL", "KAIROMONES", "PARAPHEROMONES", "TRAP SYSTEMS"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full border-2 text-sm md:text-3xl transition 
                  ${
                    selectedFilter === filter
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-gray-700 border-red-500 hover:bg-gray-100"
                  }`}
              >
                {filter}
              </button>
            )
          )}
        </div>

        {/* Carousel Section */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1200px]">
            {filteredProducts.length > 0 && (
              <Carousel
                key={filteredProducts.length}
                opts={{
                  align: carouselAlign,
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 1000,
                    stopOnInteraction: false,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent
                  className={`flex gap-4 ${
                    carouselAlign === "center" ? "justify-center" : ""
                  }`}
                >
                  {filteredProducts.map((product, idx) => (
                    <CarouselItem
                      key={idx}
                      className={`flex-shrink-0 ${
                        filteredProducts.length <= 2
                          ? "basis-[60%] sm:basis-[50%] md:basis-[40%] lg:basis-[30%]"
                          : "basis-[80%] sm:basis-[80%] md:basis-1/2 lg:basis-1/4"
                      }`}
                    >
                      <Card className="h-[320px] md:h-[380px] rounded-full running-border flex items-center justify-center overflow-hidden">
                        <CardContent className="p-0 w-full h-full flex items-center justify-center">
                          <img
                            src={`/images/slides/${product.src}`}
                            alt={`Product ${idx + 1}`}
                            className="max-h-full max-w-full object-contain mix-blend-multiply"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
