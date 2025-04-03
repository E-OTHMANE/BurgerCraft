import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BurgerProvider } from "./context/BurgerContext";

createRoot(document.getElementById("root")!).render(
  <BurgerProvider>
    <App />
  </BurgerProvider>
);
