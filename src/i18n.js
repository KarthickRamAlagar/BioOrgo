import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { navbarTranslations } from "./constants/NavbarTranslation";

const resources = {
  en: {
    translation: {
      ...navbarTranslations.en,
    },
  },
  ta: {
    translation: {
      ...navbarTranslations.ta,
    },
  },
  ur: {
    translation: {
      ...navbarTranslations.ur,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
