import { Home, BookOpen, Lightbulb, Code, Languages } from "lucide-react";

export const navbarTranslations = {
  en: {
    navbar: {
      language: { label: "Language", icon: Languages },
      aboutUs: { label: "About Us", icon: Home, target: "about-us" },
      catalogue: { label: "Catalogue", icon: BookOpen, target: "catalogue" },
      basics: { label: "Basics", icon: Lightbulb, target: "basics" },
      development: { label: "Development", icon: Code, target: "development" },
    },
    tagline: {
      tag1: "Semiochemical",
      tag2: "The Language of Nature",
    },
  },
  kn: {
    navbar: {
      language: { label: "ಭಾಷೆ", icon: Languages },
      aboutUs: { label: "ನಮ್ಮ ಬಗ್ಗೆ", icon: Home, target: "about-us" },
      catalogue: { label: "ಕ್ಯಾಟಲಾಗ್", icon: BookOpen, target: "catalogue" },
      basics: { label: "ಮೂಲಭೂತಗಳು", icon: Lightbulb, target: "basics" },
      development: { label: "ವಿಕಾಸ", icon: Code, target: "development" },
    },
    tagline: {
      tag1: "ಸೆಮಿಯೋಕ್ಯಾಮಿಕಲ್",
      tag2: "ಪ್ರಕೃತಿಯ ಭಾಷೆ",
    },
  },
  ms: {
    navbar: {
      language: { label: "Bahasa", icon: Languages },
      aboutUs: { label: "Tentang Kami", icon: Home, target: "about-us" },
      catalogue: { label: "Katalog", icon: BookOpen, target: "catalogue" },
      basics: { label: "Asas", icon: Lightbulb, target: "basics" },
      development: { label: "Pembangunan", icon: Code, target: "development" },
    },
    tagline: {
      tag1: "Semiochemical",
      tag2: "Bahasa Alam",
    },
  },
};
