import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/context/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.Fragment>,
);
