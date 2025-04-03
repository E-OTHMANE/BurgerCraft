import { useBurger } from "../context/BurgerContext";
import BurgerVisualization from "./BurgerVisualization";
import { ingredients } from "../data/ingredients";

interface FinalProps {
  navigateToBuilder: () => void;
  navigateToWelcome: () => void;
}

export default function Final({ navigateToBuilder, navigateToWelcome }: FinalProps) {
  const { 
    selectedIngredients, 
    burgerName, 
    updateBurgerName, 
    resetBurger 
  } = useBurger();

  // Group ingredients by category for display
  const ingredientsByCategory = selectedIngredients.reduce((acc, ingredient) => {
    const category = ingredient.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(ingredient);
    return acc;
  }, {} as Record<string, typeof ingredients>);

  const handleSaveBurger = () => {
    // In a real app, we'd save to backend here
    alert(`Burger "${burgerName || 'Unnamed Burger'}" saved successfully!`);
  };

  const handleStartOver = () => {
    resetBurger();
    navigateToWelcome();
  };

  return (
    <div className="h-full flex flex-col">
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
          <button className="text-[#F97316] hover:text-[#B91C1C]" onClick={navigateToBuilder}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline ml-1">Back to Builder</span>
          </button>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-[#4B3621]">Your Masterpiece!</h2>
          
          {/* Final Burger Visualization */}
          <div className="mb-8">
            <BurgerVisualization ingredients={selectedIngredients} size="small" />
          </div>
          
          {/* Ingredient List */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {Object.entries(ingredientsByCategory).map(([category, categoryIngredients]) => (
              <div key={category} className={`bg-gray-50 p-3 rounded ${category === 'sauces' ? 'col-span-2' : ''}`}>
                <h4 className="font-semibold text-sm text-gray-600 mb-2">{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <p className="text-[#4B3621]">
                  {categoryIngredients.map(ing => ing.name).join(', ')}
                </p>
              </div>
            ))}
          </div>
          
          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="burger-name" className="block text-sm font-medium text-gray-700 mb-2">
              Name your burger creation
            </label>
            <input 
              type="text" 
              id="burger-name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#F97316] focus:border-[#F97316]" 
              placeholder="e.g. The Awesome Deluxe"
              value={burgerName}
              onChange={(e) => updateBurgerName(e.target.value)}
            />
          </div>
          
          {/* Final Action Buttons */}
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <button 
              className="bg-[#F97316] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-lg font-semibold shadow-md flex-grow transition hover:scale-105"
              onClick={handleSaveBurger}
            >
              <span>Save My Burger</span>
            </button>
            <button 
              className="bg-[#4B3621] hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md flex-grow transition hover:scale-105"
              onClick={handleStartOver}
            >
              <span>Start New Burger</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
