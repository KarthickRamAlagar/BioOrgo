/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        black: {
          DEFAULT: "#000",
          100: "#010103",
          200: "#0E0E10",
          300: "#1C1C21",
          500: "#3A3A49",
          600: "#1A1A1A",
        },
        white: {
          DEFAULT: "#FFFFFF",
          800: "#E4E4E6",
          700: "#D6D9E9",
          600: "#AFB0B6",
          500: "#62646C",
        },
      },
      backgroundImage: {
        terminal: "url('/images/terminal.png')",
      },

      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      dropShadow: {
        "red-yellow": ["0 0 8px red", "0 0 4px yellow"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addComponents, theme }) {
      const customComponents = {
        /* Contact Form */
        ".contact-container": {
          position: "relative",
          zIndex: "10",
          maxWidth: theme("maxWidth.xl"),
          width: "100%",
          paddingLeft: theme("spacing.5"),
          paddingRight: theme("spacing.5"),
          backgroundColor: theme("colors.white.DEFAULT"),
          borderRadius: theme("borderRadius.lg"),
          boxShadow: theme("boxShadow.2xl"),
          "@screen sm": {
            paddingLeft: theme("spacing.10"),
            paddingRight: theme("spacing.10"),
          },
        },
        ".field-label": {
          fontSize: theme("fontSize.lg"),
          color: theme("colors.black.600"),
        },
        ".field-input": {
          width: "100%",
          minHeight: "56px",
          paddingLeft: theme("spacing.5"),
          paddingRight: theme("spacing.5"),
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.white.800"),
          color: theme("colors.black.600"),
          fontSize: theme("fontSize.lg"),
          boxShadow: theme("boxShadow.md"),
          border: `1px solid ${theme("colors.black.300")}`,
          "&::placeholder": {
            color: theme("colors.black.500"),
          },
        },
        ".field-btn": {
          minHeight: "48px",
          paddingLeft: theme("spacing.5"),
          paddingRight: theme("spacing.5"),
          paddingTop: theme("spacing.2"),
          paddingBottom: theme("spacing.2"),
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.blue.600"),
          color: theme("colors.white.DEFAULT"),
          fontSize: theme("fontSize.lg"),
          boxShadow: theme("boxShadow.lg"),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: theme("spacing.3"),
          width: "100%",
          "&:hover": {
            backgroundColor: theme("colors.blue.700"),
          },
        },
        ".field-btn_arrow": {
          width: "10px",
          height: "10px",
          objectFit: "contain",
          filter: "invert(0)",
        },

        /* Work Experience Section */
        ".work-container": {
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: theme("spacing.3"),
          marginTop: theme("spacing.12"),
          "@screen lg": {
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          },
        },
        ".work-canvas": {
          gridColumn: "span 1 / span 1",
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.black.200"),
          border: `1px solid ${theme("colors.black.300")}`,
        },
        ".work-content": {
          gridColumn: "span 2 / span 2",
          borderRadius: theme("borderRadius.lg"),
          backgroundColor: theme("colors.black.200"),
          border: `1px solid ${theme("colors.black.300")}`,
        },
        ".work-content_container": {
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          alignItems: "start",
          gap: theme("spacing.3"),
          transitionProperty: "all",
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "500ms",
          cursor: "pointer",
          borderRadius: theme("borderRadius.lg"),
          paddingLeft: theme("spacing.2.5"),
          paddingRight: theme("spacing.2.5"),
          "&:hover": {
            backgroundColor: theme("colors.black.300"),
          },
        },
        ".work-content_logo": {
          borderRadius: theme("borderRadius[" + "3xl" + "]"),
          width: theme("spacing.16"),
          height: theme("spacing.16"),
          padding: theme("spacing.2"),
          backgroundColor: theme("colors.black.600"),
        },
        ".work-content_bar": {
          flex: "1 1 0%",
          width: "0.125rem",
          marginTop: theme("spacing.4"),
          height: "100%",
          backgroundColor: theme("colors.black.300"),
          "&:hover": {
            backgroundColor: theme("colors.black.500"),
          },
          "&:last-child": {
            display: "none",
          },
        },
      };

      addComponents(customComponents);
    }),
  ],
};
