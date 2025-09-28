"use client";
import { useEffect } from "react";
import { ParallaxBanner } from "react-scroll-parallax";
import Navbar from "./Navbar";
import Tagline from "./Tagline";

//  Immediately lock scroll on script execution
if (typeof window !== "undefined") {
  const hasScrolled = sessionStorage.getItem("hasScrolled");
  if (!hasScrolled) {
    document.body.style.overflow = "hidden";
    document.body.classList.add("scroll-lock");
  }
}

const TaglineSection = ({ scrollTargetRef }) => {
  useEffect(() => {
    // Prevent browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force scroll to top before refresh
    window.onbeforeunload = () => window.scrollTo(0, 0);

    // Unlock scroll if already clicked
    const hasScrolled = sessionStorage.getItem("hasScrolled");
    if (hasScrolled) {
      document.body.style.overflow = "auto";
      document.body.classList.remove("scroll-lock");
    }
  }, []);

  return (
    <ParallaxBanner
      layers={[{ image: "/images/banner1.jpg", speed: -10 }]}
      className="h-screen w-full flex flex-col items-center justify-center relative"
      id="tagline-section"
    >
      <Navbar />
      <Tagline scrollTargetRef={scrollTargetRef} />
    </ParallaxBanner>
  );
};

export default TaglineSection;
