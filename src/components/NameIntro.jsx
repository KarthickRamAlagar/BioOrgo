import React, { useState, useRef } from "react";
import { Typewriter } from "react-simple-typewriter";

import NavigateButton from "./navigateButton";

const NameIntro = ({ scrollTargetRef }) => {
  const [startTyping, setStartTyping] = useState(false);
  const audioRef = useRef(null);

  const tagline = {
    tag1: "BIO ORGO",
    tag2: "A Brand of Kempmann Bioorganics",
  };

  // triggers typing & audio together after user interaction
  const handleStart = () => {
    if (!startTyping) {
      setStartTyping(true);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => console.warn(err));

        // Stop audio after 10 seconds
        setTimeout(() => {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }, 10000);
      }
    }
  };

  const handleScrollToNext = () => {
    if (scrollTargetRef?.current) {
      const topOffset =
        scrollTargetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: topOffset - 80, behavior: "smooth" });
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 drop-shadow-red-yellow leading-10 cursor-pointer"
      onClick={handleStart} 
    >
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/Branding.mp3" preload="auto" />

      {startTyping ? (
        <>
          <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-9xl text-center">
            <Typewriter
              words={[tagline.tag1]}
              loop={false}
              typeSpeed={100}
              deleteSpeed={0}
              delaySpeed={999999}
            />
          </h1>

          <h2 className="font-bold mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center leading-tight">
            <Typewriter
              words={[tagline.tag2]}
              loop={false}
              typeSpeed={90}
              deleteSpeed={0}
              delaySpeed={999999}
            />
          </h2>

          <NavigateButton onClick={handleScrollToNext} />
        </>
      ) : (
        <p className="text-lg">Click anywhere to start</p>
      )}
    </div>
  );
};

export default NameIntro;
