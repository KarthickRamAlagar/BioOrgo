import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigateButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  // Show button after 9 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate("/bioorgo.com"); 
  };

  return (
    <AnimatePresence>
      {showButton && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
          {/* Tooltip */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              layout
              className="flex items-center gap-3 bg-white shadow-lg rounded-full px-4 py-2 whitespace-nowrap"
            >
              <img
                src="/images/favicon.png"
                alt="Efficiency"
                className="w-10 h-10 rounded"
              />
              <span className="font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent text-xl">
                ReSearch On BioOrgo
              </span>
            </motion.div>
          )}

          {/* Floating Button */}
          <motion.button
            onClick={handleClick}
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-14 h-14 flex items-center justify-center rounded-full font-bold text-red-600 shadow-lg bg-white hover:bg-white"
          >
            <ChevronRight className="w-7 h-7" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavigateButton;
