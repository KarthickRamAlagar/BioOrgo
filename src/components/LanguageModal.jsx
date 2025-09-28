import React from "react";
import { X } from "lucide-react";
import i18n from "../i18n";

const LanguageModal = ({
  isOpen,
  onClose,
  selectedLanguage,
  setSelectedLanguage,
  triggeredFromMobile,
  setTriggeredFromMobile,
  setIsMobileOpen,
}) => {
  if (!isOpen) return null;

  const languages = [
    { label: "English", code: "en" },
    { label: "Kannadam", code: "kn" },
    { label: "Malay", code: "ms" },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang.code);
    localStorage.setItem("lang", lang.code);
    setSelectedLanguage(lang.label);
    onClose();

    if (triggeredFromMobile) {
      setIsMobileOpen(true); 
      setTriggeredFromMobile(false); 
    }
  };

  return (
    <div className="fixed inset-0 bg-red-200/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(255,0,0,0.5),0_0_20px_rgba(255,215,0,0.5)] w-full max-w-4xl p-6 flex flex-col md:flex-row gap-6 relative">
        {/* Close Button */}
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-red-600 font-extrabold hover:text-red-700 z-10"
          onClick={() => {
            onClose();
            setTriggeredFromMobile(false);
          }}
        >
          <X size={32} />
        </button>

        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src="/images/banner1.jpg"
            alt="Language"
            className="w-full max-w-[384px] h-auto rounded-2xl shadow-[0_8px_25px_rgba(255,215,0,0.7)] object-cover"
          />
        </div>

        {/* Language Options */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-4 px-2 md:px-6">
          <div className="flex flex-wrap gap-4">
            {languages.map((lang) => (
              <label
                key={lang.code}
                className="flex items-center space-x-2 min-w-[calc(50%-8px)] md:min-w-[calc(50%-12px)] text-gray-700 font-medium text-lg md:text-xl"
              >
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={selectedLanguage === lang.label}
                  onChange={() => handleLanguageChange(lang)}
                  className="w-8 h-8 accent-red-500"
                />
                <span>{lang.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
