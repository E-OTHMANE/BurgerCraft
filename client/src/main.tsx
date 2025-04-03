import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BurgerProvider } from "./context/BurgerContext";
import { AuthProvider } from "./context/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { Router } from "wouter";

// Create a custom element for mounting the app
const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

// Use a stable reference for the app
// Wrap the App component with all necessary providers
createRoot(container).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <AuthProvider>
        <BurgerProvider>
          <App />
          <Toaster />
        </BurgerProvider>
      </AuthProvider>
    </Router>
  </QueryClientProvider>
);
