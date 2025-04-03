import { useState } from 'react';
import { useBurger } from '../context/BurgerContext';
import { categories, ingredients } from '../data/ingredients';
import IngredientCard from './IngredientCard';
import BurgerVisualization from './BurgerVisualization';

interface BuilderProps {
  navigateToFinal: () => void;
  navigateToWelcome: () => void;
}

export default function Builder({ navigateToFinal, navigateToWelcome }: BuilderProps) {
  const { 
    selectedIngredients, 
    currentCategory, 
    setCurrentCategory, 
    addIngredient, 
    removeIngredient, 
    resetBurger,
    saveBurger
  } = useBurger();
  
  const handleCategoryClick = (category: string) => {
    setCurrentCategory(category);
  };
  
  const handleIngredientToggle = (ingredient: typeof ingredients[0]) => {
    const isSelected = selectedIngredients.some(ing => ing.id === ingredient.id);
    
    if (isSelected) {
      removeIngredient(ingredient.id);
    } else {
      addIngredient(ingredient);
    }
  };
  
  const handleFinish = () => {
    saveBurger();
    navigateToFinal();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" fill="#F97316" />
              <rect x="30" y="35" width="40" height="30" rx="3" fill="#F0C080" />
              <rect x="25" y="50" width="50" height="5" rx="2" fill="#84CC16" />
              <rect x="28" y="55" width="44" height="8" rx="2" fill="#7C2D12" />
              <rect x="25" y="63" width="50" height="5" rx="2" fill="#FACC15" />
              <rect x="30" y="68" width="40" height="7" rx="3" fill="#F0C080" />
            </svg>
            <h1 className="text-xl font-bold text-[#4B3621]">BurgerFy</h1>
          </div>
          <button 
            className="text-[#F97316] hover:text-[#B91C1C]"
            onClick={resetBurger}
          >
            <span className="hidden md:inline mr-1">Start Over</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">
        {/* Categories and Ingredients Panel */}
        <div className="bg-white md:w-80 md:flex-shrink-0 md:border-r md:shadow-lg">
          {/* Mobile Tabs */}
          <div className="md:hidden overflow-x-auto whitespace-nowrap py-3 px-2 border-b">
            {categories.map((category) => (
              <button 
                key={category.id}
                className={`category-tab px-4 py-2 mr-2 rounded-full text-sm font-medium ${
                  currentCategory === category.id 
                    ? 'bg-[#F97316] text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Desktop Categories */}
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold px-4 py-3 bg-gray-100 border-b">Categories</h3>
            <nav className="p-2 space-y-1">
              {categories.map((category) => (
                <button 
                  key={category.id}
                  className={`category-nav w-full px-4 py-3 rounded-md text-left font-medium ${
                    currentCategory === category.id 
                      ? 'bg-[#F97316] text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  } focus:outline-none`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Ingredients List */}
          <div className="ingredients-container overflow-y-auto h-80 md:h-[calc(100vh-13.5rem)]">
            {categories.map((category) => (
              <div 
                key={category.id}
                className={`ingredient-section ${currentCategory === category.id ? '' : 'hidden'}`}
              >
                <div className="p-4 grid grid-cols-2 gap-3">
                  {ingredients
                    .filter(ingredient => ingredient.category === category.id)
                    .map(ingredient => (
                      <IngredientCard 
                        key={ingredient.id}
                        ingredient={ingredient}
                        isSelected={selectedIngredients.some(ing => ing.id === ingredient.id)}
                        onClick={() => handleIngredientToggle(ingredient)}
                      />
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Burger Visualization */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow flex items-center justify-center py-6 px-4 bg-gray-50">
            <BurgerVisualization ingredients={selectedIngredients} />
          </div>
          
          {/* Finish Button */}
          <div className="bg-white p-4 border-t flex justify-end">
            <button 
              onClick={handleFinish}
              className="bg-[#F97316] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-lg font-semibold shadow-md flex items-center transition hover:scale-105"
            >
              <span>Finish</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
