import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Welcome from "./components/Welcome";
import Builder from "./components/Builder";
import Final from "./components/Final";

function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'builder' | 'final'>('welcome');
  
  // Logic for page transitions with transform styles
  const getPageStyle = (page: string) => {
    switch (currentPage) {
      case 'welcome':
        if (page === 'welcome') return { transform: 'translateX(0)' };
        if (page === 'builder') return { transform: 'translateX(100%)' };
        return { transform: 'translateX(200%)' };
      case 'builder':
        if (page === 'welcome') return { transform: 'translateX(-100%)' };
        if (page === 'builder') return { transform: 'translateX(0)' };
        return { transform: 'translateX(100%)' };
      case 'final':
        if (page === 'welcome') return { transform: 'translateX(-200%)' };
        if (page === 'builder') return { transform: 'translateX(-100%)' };
        return { transform: 'translateX(0)' };
      default:
        return {};
    }
  };

  return (
    <div className="app-container h-screen flex flex-col overflow-hidden">
      <div className="page h-full" style={getPageStyle('welcome')}>
        <Welcome navigateToBuilder={() => setCurrentPage('builder')} />
      </div>
      
      <div className="page h-full" style={getPageStyle('builder')}>
        <Builder 
          navigateToFinal={() => setCurrentPage('final')} 
          navigateToWelcome={() => setCurrentPage('welcome')} 
        />
      </div>
      
      <div className="page h-full" style={getPageStyle('final')}>
        <Final 
          navigateToBuilder={() => setCurrentPage('builder')} 
          navigateToWelcome={() => setCurrentPage('welcome')} 
        />
      </div>
      
      <Toaster />
    </div>
  );
}

export default App;
