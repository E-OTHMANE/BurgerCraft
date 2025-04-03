import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import IngredientCategory from '@/components/IngredientCategory';
import BurgerPreview from '@/components/BurgerPreview';
import { useIngredients } from '@/hooks/useBurger';
import { useBurgerContext } from '@/context/BurgerContext';
import { countIngredients, groupIngredientsByType, formatCategoryName } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const BuilderPage: React.FC = () => {
  const [_, setLocation] = useLocation();
  const { state, resetBurger } = useBurgerContext();
  const { isLoading, error } = useIngredients();
  
  const { ingredients, burger } = state;
  
  const handleFinish = () => {
    if (burger.ingredients.length === 0) {
      return; // Don't proceed if no ingredients are selected
    }
    setLocation('/final');
  };
  
  const handleReset = () => {
    resetBurger();
  };
  
  // Group ingredients by type
  const groupedIngredients = groupIngredientsByType(ingredients);
  
  // Calculate ingredient counts for the selected ingredients UI
  const ingredientCounts = countIngredients(burger.ingredients);
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <h2 className="text-xl font-bold text-red-500">Error Loading Ingredients</h2>
          <p className="mt-2 text-gray-600">Please refresh the page to try again.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex flex-col mr-2">
              <div className="w-6 h-1 bg-bun rounded-full"></div>
              <div className="w-6 h-1 bg-lettuce rounded-full my-0.5"></div>
              <div className="w-6 h-1 bg-meat rounded-full"></div>
            </div>
            <h1 className="font-heading text-xl font-bold text-primary">BurgerFy</h1>
          </div>
          <div className="flex items-center">
            <button 
              onClick={handleReset}
              className="text-gray-500 hover:text-primary mr-4 flex items-center gap-1"
            >
              <RefreshCw className="h-4 w-4" />
              Start Over
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Ingredients Panel (Left Side on Desktop) */}
        <div className="bg-white md:w-1/3 lg:w-1/4 p-4 md:shadow-md overflow-y-auto">
          <h2 className="font-heading text-lg font-bold mb-4">Ingredients</h2>
          
          {isLoading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="h-10 w-full mb-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Category accordions
            <div className="space-y-4">
              {Object.entries(groupedIngredients).map(([category, items]) => (
                <IngredientCategory
                  key={category}
                  name={formatCategoryName(category)}
                  ingredients={items}
                  defaultOpen={category === 'bun'} // Open the buns category by default
                />
              ))}
            </div>
          )}

          {/* Selected Ingredients */}
          <div className="mt-6 p-2 border-t border-gray-200">
            <h3 className="font-heading text-sm font-bold mb-2">Your Selections</h3>
            <ul className="text-sm space-y-1">
              {ingredientCounts.length === 0 ? (
                <li className="flex justify-between items-center text-gray-500 italic">
                  <span>No ingredients selected yet</span>
                </li>
              ) : (
                ingredientCounts.map((item) => (
                  <li key={item.ingredient.id} className="flex justify-between items-center">
                    <span>{item.ingredient.displayName}</span>
                    <span className="text-gray-600">{item.count > 1 ? `x${item.count}` : ''}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Burger Preview (Right Side/Center on Desktop) */}
        <div className="flex-grow bg-gray-50 p-4 flex flex-col justify-center items-center relative">
          <div className="burger-wrapper bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto min-h-[400px] flex flex-col justify-center items-center">
            <h2 className="font-heading text-xl font-bold mb-6 text-center">Your Burger</h2>
            
            {/* Burger Visualization */}
            <BurgerPreview 
              ingredients={burger.ingredients} 
              className="mb-6"
            />
            
            {/* Instructions */}
            <p className="text-center text-gray-600 mt-4">Click ingredients from the menu to add them to your burger</p>
          </div>
          
          {/* Finish Button */}
          <Button 
            onClick={handleFinish}
            disabled={burger.ingredients.length === 0}
            className="mt-6 bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Finish My Burger
          </Button>
        </div>
      </main>
    </div>
  );
};

export default BuilderPage;
