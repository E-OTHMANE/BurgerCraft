import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BurgerProvider } from "./context/BurgerContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { Router } from "wouter";

// Create a custom element for mounting the app
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

// Use a stable reference for the app
// Wrap the App component with all necessary providers
// Especially important: keep the BurgerProvider closest to the App component
createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <BurgerProvider>
        <App />
        <Toaster />
      </BurgerProvider>
    </Router>
  </QueryClientProvider>
);
