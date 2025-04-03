import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BurgerProvider } from "./context/BurgerContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";

// Create a custom element for mounting the app
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

// Render the application with all providers
createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <BurgerProvider>
      <App />
      <Toaster />
    </BurgerProvider>
  </QueryClientProvider>
);
