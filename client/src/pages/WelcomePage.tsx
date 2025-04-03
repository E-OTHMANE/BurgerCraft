import React from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

const WelcomePage: React.FC = () => {
  const [_, setLocation] = useLocation();
  
  const handleGetStarted = () => {
    setLocation('/build');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
      <div className="text-center max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          {/* Logo animation container */}
          <div className="w-40 h-40 relative">
            {/* Stylized burger logo */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-32 h-8 bg-bun rounded-t-full"></div>
              <div className="w-32 h-2 bg-lettuce"></div>
              <div className="w-32 h-4 bg-meat"></div>
              <div className="w-32 h-2 bg-cheese"></div>
              <div className="w-32 h-8 bg-bun rounded-b-full"></div>
            </div>
          </div>
        </div>
        
        <h1 className="font-heading text-4xl font-bold text-primary mb-4">BurgerFy</h1>
        <p className="text-lg mb-8 text-gray-600">Create your dream burger in just a few clicks!</p>
        
        <Button 
          onClick={handleGetStarted}
          className="bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          size="lg"
        >
          Welcome to BurgerFy
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
