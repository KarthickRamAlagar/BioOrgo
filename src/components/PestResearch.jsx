"use client";
import React, { useState, useRef, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import { PestResearchTranslations } from "../constants/PestResearchTranslations";
import PaginationControls from "./PaginationControls";

const PestResearch = () => {
  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidePages, setSlidePages] = useState({}); 

  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const translations =
    PestResearchTranslations[lang] || PestResearchTranslations["en"];

  const slides = [
    { title: "Pest Management Solutions", text: translations.pestManagement },
    { title: "Research", text: translations.research },
  ];

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index) => {
    emblaApi?.scrollTo(index);
    autoplay.current?.reset();
  };

  const setPageForSlide = (slideIndex, page) => {
    setSlidePages((prev) => ({ ...prev, [slideIndex]: page }));
  };

  const itemsPerPage = 3; 
  return (
    <div
      className="w-screen py-10 flex flex-col lg:flex-row items-center lg:items-stretch rounded-2xl shadow-lg overflow-hidden bg-white/50 -mt-10"
      id="development"
    >
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 h-auto justify-end pr-6 relative">
        {/* Background Image - centered and blurred */}
        <div className="absolute inset-0 z-0 flex items-center justify-center ">
          <img
            src="/images/favicon.png"
            alt="Background"
            className="h-40 w-auto blur-sm brightness-75 rounded-full drop-shadow-[0_0_12px_red] scale-[1.05]"
          />
        </div>

        {/* Foreground Image */}
        <img
          src="/images/Pest.png"
          alt="Kempmann Bioorganics"
          className="relative z-10 w-[95%] h-full object-cover rounded-full  rounded-bl-3xl shadow-xl drop-shadow-[0_10px_20px_rgba(220,38,38,0.8)]"
        />
      </div>

      {/* Right Side - Carousel Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 text-gray-800">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, idx) => {
              const currentPage = slidePages[idx] || 1;
              const totalPages = Math.ceil(slide.text.length / itemsPerPage);
              const start = (currentPage - 1) * itemsPerPage;
              const pageItems = slide.text.slice(start, start + itemsPerPage);

              return (
                <div
                  key={idx}
                  className="flex-[0_0_100%] w-full max-w-full px-4 relative"
                >
                  {/* Background Image behind UL (only on md and below) */}
                  <div className="absolute inset-0 z-0 flex items-center justify-center lg:hidden">
                    <img
                      src="/images/logo1.svg"
                      alt="Background"
                      className="h-20 sm:h-24 w-auto blur-sm brightness-40 rounded-lg drop-shadow-[0_0_8px_red] scale-[1.02]"
                    />
                  </div>

                  {/* Foreground Content */}
                  <div className="relative z-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-7xl font-extrabold text-white drop-shadow-red-yellow opacity-0 animate-fade-in mb-6">
                      {slide.title}
                    </h2>

                    <ul className="list-disc list-inside text-left text-2xl md:text-4xl md:mx-6 space-y-6 leading-relaxed tracking-wider marker:text-red-500 break-keep whitespace-normal">
                      {pageItems.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-purple-500  font-bold lg:font-semibold"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>

                    {totalPages > 1 && (
                      <div className="pt-4">
                        <PaginationControls
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={(page) => setPageForSlide(idx, page)}
                          variant="green"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center items-center mt-20 space-x-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                selectedIndex === idx
                  ? "bg-yellow-500 scale-125"
                  : "bg-yellow-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestResearch;
