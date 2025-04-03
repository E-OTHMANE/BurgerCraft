import { Switch, Route } from "wouter";
import WelcomePage from "@/pages/WelcomePage";
import BuilderPage from "@/pages/BuilderPage";
import FinalPage from "@/pages/FinalPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/build" component={BuilderPage} />
      <Route path="/final" component={FinalPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
