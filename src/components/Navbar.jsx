  import React, { useState, useEffect } from "react";
  import { Menu, X, Languages } from "lucide-react";
  import { useTranslation } from "react-i18next";
  import { navbarTranslations } from "../constants/NavbarTranslation";
  import LanguageModal from "./LanguageModal";

  const Navbar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [triggeredFromMobile, setTriggeredFromMobile] = useState(false);

    const { i18n } = useTranslation();
    const lang = i18n.language || "en";
    const navbarItems = navbarTranslations[lang]?.navbar || {};

    const [selectedLanguage, setSelectedLanguage] = useState(() => {
      const savedLang = localStorage.getItem("lang");
      if (savedLang === "kn") return "Kannadam";
      if (savedLang === "ms") return "Malay";
      return "English";
    });

    const logo1 = "/images/logo1.svg";

    useEffect(() => {
      const savedLang = localStorage.getItem("lang");
      if (savedLang) {
        import("../i18n").then(({ default: i18n }) =>
          i18n.changeLanguage(savedLang)
        );
      }
    }, []);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      document.body.style.overflow = isMobileOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [isMobileOpen]);

    const handleNavClick = (key, item) => {
      if (key === "language") {
        setIsLanguageOpen(true);
      } else if (item.target) {
        const section = document.getElementById(item.target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          setIsMobileOpen(false);
        }
      }
    };

    return (
      <>
        {/* Top Navbar */}
        <nav
          className={`fixed left-0 right-0 z-50 w-full h-auto min-h-[64px] transition-all duration-500 ${
            isScrolled
              ? "top-0 backdrop-blur-md rounded-2xl shadow-lg"
              : "top-0"
          } bg-gray-400/40 px-2 sm:px-4 md:px-6`}
        >
          <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto py-4 px-4 lg:px-6 2xl:px-0">
            {/* Logo */}
            <div className="absolute left-0 top-4 pl-4 2xl:pl-3">
              <button
                onClick={() => {
                  const section = document.getElementById("tagline-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                    setIsMobileOpen(false);
                  }
                }}
                className="focus:outline-none"
              >
                <img
                  src={logo1}
                  alt="Brand"
                  className="h-10 sm:h-14 lg:h-9 2xl:h-12 w-auto rounded-lg object-contain drop-shadow-[0_0_8px_red] scale-[1.02]"
                />
              </button>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex flex-grow justify-end items-center space-x-4 2xl:gap-x-4 2xl:flex-nowrap 2xl:pr-0">
              {Object.keys(navbarItems).map((key) => {
                const item = navbarItems[key];
                const label = item.label || item;
                const IconComponent = item.icon || null;

                return (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key, item)}
                    className="flex items-center space-x-3 text-white font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl whitespace-nowrap hover:text-yellow-400 transition"
                  >
                    {IconComponent && <IconComponent size={24} />}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Icons */}
            <div className="flex md:flex lg:hidden items-center space-x-4 ml-auto pr-4 pt-0">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setTriggeredFromMobile(true);
                  setIsLanguageOpen(true);
                }}
                className="text-gray-700 hover:text-red-600 transition"
                aria-label="Change Language"
              >
                <Languages size={36} className="text-white" />
              </button>
              <button
                onClick={() => setIsMobileOpen(true)}
                className="text-white pr-1"
                aria-label="Open Mobile Menu"
              >
                <Menu size={36} />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-screen min-w-fit max-w-[calc(100%-3px)] bg-white shadow-2xl z-[9999] backdrop-blur-md transform transition-transform duration-300 rounded-l-3xl overflow-hidden ${
            isMobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileOpen(false)}
              className="text-gray-700"
            >
              <X size={28} className="text-red-600 font-bolder" />
            </button>
          </div>

          <div className="flex flex-col items-start mt-6 px-6 space-y-6">
            {Object.keys(navbarItems).map((key) => {
              const item = navbarItems[key];
              const label = item.label || item;
              const IconComponent = item.icon || null;

              return (
                <button
                  key={key}
                  onClick={() => handleNavClick(key, item)}
                  className={`flex items-center space-x-4 font-bold ${
                    selectedLanguage === "Kannadam" ? "text-xl" : "text-2xl"
                  } text-green-600 hover:text-red-600 transition-transform hover:scale-105`}
                >
                  {IconComponent && (
                    <IconComponent size={36} className="text-red-600" />
                  )}
                  <span>{label}</span>
                </button>
              );
            })}

            <div className="flex items-center justify-center mx-7 my-5">
              <button
                onClick={() => {
                  const section = document.getElementById("tagline-section");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                    setIsMobileOpen(false);
                  }
                }}
                className="focus:outline-none"
              >
                <img
                  src={logo1}
                  alt="Brand"
                  className="h-12 sm:h-14 w-auto rounded-lg object-contain drop-shadow-[0_0_8px_red] scale-[1.02]"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Language Modal */}
        <LanguageModal
          isOpen={isLanguageOpen}
          onClose={() => setIsLanguageOpen(false)}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          triggeredFromMobile={triggeredFromMobile}
          setTriggeredFromMobile={setTriggeredFromMobile}
          setIsMobileOpen={setIsMobileOpen}
        />
      </>
    );
  };

  export default Navbar;
