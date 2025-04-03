import { Switch, Route } from "wouter";
import WelcomePage from "@/pages/WelcomePage";
import BuilderPage from "@/pages/BuilderPage";
import FinalPage from "@/pages/FinalPage";
import NotFound from "@/pages/not-found";
import { BurgerProvider } from "@/context/BurgerContext";

// Define routes using route descriptors instead of component prop
// We already have a BurgerProvider in main.tsx, but to fix the context issue
// we're adding a second layer here to ensure our route components can access it
function RouterWithProviders() {
  return (
    <BurgerProvider>
      <Switch>
        <Route path="/">
          {() => <WelcomePage />}
        </Route>
        <Route path="/build">
          {() => <BuilderPage />}
        </Route>
        <Route path="/final">
          {() => <FinalPage />}
        </Route>
        <Route>
          {() => <NotFound />}
        </Route>
      </Switch>
    </BurgerProvider>
  );
}

function App() {
  return <RouterWithProviders />;
}

export default App;
