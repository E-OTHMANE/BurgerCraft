import { Switch, Route } from "wouter";
import WelcomePage from "@/pages/WelcomePage";
import BuilderPage from "@/pages/BuilderPage";
import FinalPage from "@/pages/FinalPage";
import AuthPage from "@/pages/AuthPage";
import NotFound from "@/pages/not-found";
import { ProtectedRoute } from "@/lib/protected-route";
import { BurgerProvider } from "@/context/BurgerContext";

// Define routes with authentication
function RouterWithProviders() {
  return (
    <BurgerProvider>
      <Switch>
        <ProtectedRoute path="/" component={WelcomePage} />
        <ProtectedRoute path="/build" component={BuilderPage} />
        <ProtectedRoute path="/final" component={FinalPage} />
        <Route path="/auth">
          {() => <AuthPage />}
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
