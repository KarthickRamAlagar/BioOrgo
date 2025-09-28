"use client";
import React, { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslation } from "react-i18next";
import { mainSectionTranslations } from "../constants/mainSectionTranslations";

const AboutUs = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const mainSection =
    mainSectionTranslations[lang]?.mainSection ||
    mainSectionTranslations.en.mainSection;

  const lines = [mainSection.line1, mainSection.line2];

  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const audioRef = useRef(null);
  const hasPlayedAudio = useRef(false);

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

  return (
    <div
      className="relative w-full max-w-8xl mx-auto  px-4  md:px-12 py-10 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg"
    
    >
      <audio
        id="about-audio"
        ref={audioRef}
        src="/audio/Semiochemical_The _La.mp3"
        preload="auto"
      />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
        {/* Image first on md and below */}
        <div className="flex-1 order-1 lg:order-2 mt-0 flex flex-col items-center justify-center">
          <img
            src="/images/favicon.png"
            alt="App Preview"
            className="w-72 md:w-96 rounded-xl shadow-2xl filter brightness-100 hover:brightness-100 transition duration-300"
          />
        </div>

        {/* Text second on md and below */}
        <div className="flex flex-col items-center text-center space-y-6 w-full lg:w-1/2 order-2 lg:order-1">
          <div className="overflow-hidden w-full min-w-0" ref={emblaRef}>
            <div className="flex w-full">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className="flex-[0_0_100%] w-full max-w-full px-4 py-6 cursor-pointer relative"
                >
                  <h2
                    className={`text-white font-bold drop-shadow-red-yellow ${
                      lang === "kn"
                        ? "text-2xl md:text-5xl  lg:text-4xl xl:text-5xl leading-relaxed"
                        : "text-3xl md:text-6xl  lg:text-4xl  xl:text-6xl leading-snug"
                    }`}
                  >
                    <span className="text-5xl text-white font-serif absolute -left-3 -top-2">
                      “
                    </span>
                    <span className="mx-2">{line}</span>
                    <span className="text-5xl text-white font-serif absolute -right-2 -bottom-2">
                      ”
                    </span>
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            {lines.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`w-4 h-4 rounded-full transition ${
                  selectedIndex === idx
                    ? "bg-yellow-500 scale-110"
                    : "bg-yellow-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
