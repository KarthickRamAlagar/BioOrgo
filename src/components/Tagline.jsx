import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { navbarTranslations } from "../constants/NavbarTranslation";
import DownButton from "./DownButton";

const Tagline = ({ scrollTargetRef }) => {
  const [startTyping, setStartTyping] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const tagline = navbarTranslations[lang]?.tagline || {
    tag1: "Semiochemical",
    tag2: "The Language of Nature",
  };

  useEffect(() => {
    const hasScrolled = sessionStorage.getItem("hasScrolled");
    if (!hasScrolled) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("scroll-lock");
    }
  }, []);

  useEffect(() => {
    if (inView) {
      const timeout = setTimeout(() => {
        setStartTyping(true);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setStartTyping(false);
    }
  }, [inView, lang]);

  const handleScrollToNext = () => {
    if (scrollTargetRef?.current) {
      const topOffset =
        scrollTargetRef.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: topOffset - 80,
        behavior: "smooth",
      });
    }

    // Unlock scroll & persist state
    document.body.style.overflow = "auto";
    document.body.classList.remove("scroll-lock");
    sessionStorage.setItem("hasScrolled", "true");

    const audio = document.getElementById("about-audio");
    if (audio) audio.play().catch((err) => console.warn("Audio failed:", err));
  };

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 drop-shadow-red-yellow leading-10"
    >
      {startTyping && (
        <>
          <h1
            className={`font-bold text-center ${
              lang === "kn"
                ? " text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
                : " text-5xl sm:text-3xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-9xl"
            }`}
          >
            <Typewriter
              key={`tag1-${lang}`}
              words={[tagline.tag1]}
              loop={false}
              typeSpeed={100}
              deleteSpeed={0}
              delaySpeed={999999}
            />
          </h1>

          <h2
            className={`font-bold text-center ${
              lang === "kn"
                ? "mt-7 leading-relaxed text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                : "mt-6 leading-tight text-4xl sm:text-2xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
            }`}
          >
            <Typewriter
              key={`tag2-${lang}`}
              words={[tagline.tag2]}
              loop={false}
              typeSpeed={90}
              deleteSpeed={0}
              delaySpeed={999999}
            />
          </h2>
          <DownButton onClick={handleScrollToNext} />
        </>
      )}
    </div>
  );
};

export default Tagline;
