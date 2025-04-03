import { Switch, Route } from "wouter";
import WelcomePage from "@/pages/WelcomePage";
import BuilderPage from "@/pages/BuilderPage";
import FinalPage from "@/pages/FinalPage";
import NotFound from "@/pages/not-found";

// Define routes using route descriptors instead of component prop
function Router() {
  return (
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
  );
}

function App() {
  return <Router />;
}

export default App;
