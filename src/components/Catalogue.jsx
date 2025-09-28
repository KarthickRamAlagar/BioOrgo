import React, { useState, useEffect, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import PaginationControls from "./PaginationControls";
import { CatalogueSectionTranslations } from "../constants/Catalogue";

const Catalogue = () => {
  const [startTyping, setStartTyping] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [sectionPages, setSectionPages] = useState({});
  const { ref, inView } = useInView({ triggerOnce: true });
  const sectionRef = useRef(null);
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const catalogueContent =
    CatalogueSectionTranslations[lang] || CatalogueSectionTranslations["en"];
  const { heading, heading2, subheading, aboutUs, ourPhilosophy, ourImpact } =
    catalogueContent;

  const contentSections = [
    { heading: "About Us", content: aboutUs },
    { heading: "Our Philosophy", content: ourPhilosophy },
    { heading: "Our Impact", content: ourImpact },
  ];

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setStartTyping(true);
        const typingDuration = heading.length * 100 + 500;
        setTimeout(() => {
          setTypingDone(true);
          sectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, typingDuration);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setStartTyping(false);
      setTypingDone(false);
    }
  }, [inView, lang]);

  const setPageForSection = (sectionIndex, page) => {
    setSectionPages((prev) => ({ ...prev, [sectionIndex]: page }));
  };

  const renderPaginatedContent = (
    pageItems,
    currentPage,
    totalPages,
    setPage
  ) => (
    <div className="space-y-6 text-left">
      {pageItems.map((line, idx) => {
        const trimmed = line.trim();
        const isSubpoint =
          trimmed.startsWith("-") ||
          trimmed.startsWith("•") ||
          /^\d+\./.test(trimmed) ||
          (trimmed.includes(":") && trimmed.split(":")[0].length < 20);

        return (
          <div
            key={idx}
            className={
              isSubpoint
                ? "pl-6 text-lg md:text-xl text-gray-700  lg:text-gray-700"
                : "text-xl md:text-2xl text-gray-700 md:text-white lg:text-gray-900 font-semibold"
            }
          >
            {trimmed}
          </div>
        );
      })}

      <div className="pt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          variant="green"
        />
      </div>
    </div>
  );

  const headingFontClass =
    lang === "kn"
      ? "text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-6xl 2xl:text-7xl"
      : "text-3xl sm:text-4xl md:text-6xl lg:text-4xl xl:text-8xl 2xl:text-9xl";

  const subHeadingFontClass =
    lang === "kn"
      ? "text-2xl sm:text-3xl lg:text-6xl -mt-2"
      : "text-5xl sm:text-5xl lg:text-8xl";

  return (
    <div
      ref={sectionRef}
      className="w-screen -py-10 transition-all duration-700"
      id="catalogue"
    >
      <div className="flex flex-col lg:flex-row items-stretch rounded-2xl shadow-lg overflow-hidden bg-white">
        {/* Left Side - Content */}
        <div
          ref={ref}
          className="relative lg:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center items-center text-center overflow-hidden"
        >
          {/* Background Image with Blur (visible on md and below) */}
          <div className="absolute inset-0 md:block lg:hidden">
            <img
              src="/images/favicon.png"
              alt="Background"
              className="w-full h-full object-contain blur-lg brightness-90"
            />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 w-full">
            {!typingDone && startTyping && (
              <h1
                className={`${headingFontClass} text-white drop-shadow-red-yellow`}
              >
                <Typewriter
                  words={[heading]}
                  loop={false}
                  typeSpeed={100}
                  deleteSpeed={0}
                  delaySpeed={999999}
                />
              </h1>
            )}

            {typingDone && (
              <>
                <h5
                  className={`${subHeadingFontClass} font-extrabold opacity-0 animate-fade-in mb-6`}
                >
                  <span style={{ color: "#228B22" }}>Kempmann</span>{" "}
                  <span style={{ color: "#8B4513" }}>Bioorganics</span>
                </h5>

                <h6 className="text-xl md:text-2xl text-gray-600 lg:text-gray-700 font-bold mb-4">
                  {heading2}
                </h6>

                <p className="text-lg md:text-xl text-gray-600 lg:text-gray-900 mb-6">
                  {subheading}
                </p>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full max-w-3xl text-left"
                >
                  {contentSections.map((section, index) => {
                    const lines = section.content.split("\n");
                    const currentPage = sectionPages[index] || 1;
                    const itemsPerPage = 3;
                    const totalPages = Math.ceil(lines.length / itemsPerPage);
                    const start = (currentPage - 1) * itemsPerPage;
                    const pageItems = lines.slice(start, start + itemsPerPage);

                    return (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-2xl md:text-4xl md:mx-6">
                          {section.heading}
                        </AccordionTrigger>
                        <AccordionContent className="text-lg md:text-2xl md:mx-6">
                          {renderPaginatedContent(
                            pageItems,
                            currentPage,
                            totalPages,
                            (page) => setPageForSection(index, page)
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Image (only visible on lg and above) */}
        <div className="hidden lg:flex lg:w-1/2 h-auto justify-end pr-6">
          <img
            src="/images/Catalogue.jpg"
            alt="Kempmann Bioorganics"
            className="w-[95%] h-full object-cover rounded-tl-3xl rounded-bl-3xl shadow-xl drop-shadow-[0_10px_20px_rgba(220,38,38,0.8)]"
          />
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
