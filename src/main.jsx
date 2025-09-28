import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ParallaxProvider } from "react-scroll-parallax";
import "./index.css";

// i18n
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParallaxProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ParallaxProvider>
  </React.StrictMode>
);
