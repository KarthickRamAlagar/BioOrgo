"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const UpButton = () => {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleScrollToTagline = () => {
    const section = document.getElementById("tagline-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex justify-end mt-3 mb-6 relative">
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute right-24 flex items-center gap-3 bg-white shadow-lg rounded-full px-4 py-2 z-10"
      >
        <img
          src="/images/favicon.png"
          alt="Go Up"
          className="w-6 h-6 lg:w-12 lg:h-12 rounded-full"
        />
        <span className="font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent lg:text-xl">
          Thanks For Visting US !
        </span>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={handleScrollToTagline}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={loading}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={` w-12 h-12 lg:w-20 lg:h-20 flex items-center justify-center rounded-full font-extrabold text-green-600 shadow-lg bg-white drop-shadow-[0_0_8px_red] ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-white"
        }`}
      >
        <ChevronUp className="w-12 h-12" />
      </motion.button>
    </div>
  );
};

export default UpButton;
