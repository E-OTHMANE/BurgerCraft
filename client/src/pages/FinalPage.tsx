import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BurgerPreview from '@/components/BurgerPreview';
import { useBurgerContext } from '@/context/BurgerContext';
import { useSaveBurger } from '@/hooks/useBurger';
import { countIngredients, calculateBurgerPrice, formatPrice } from '@/lib/utils';

const FinalPage: React.FC = () => {
  const [_, setLocation] = useLocation();
  const { state, setBurgerName, resetBurger } = useBurgerContext();
  const { burger } = state;
  
  const saveBurgerMutation = useSaveBurger();
  
  // Handle name input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBurgerName(e.target.value);
  };
  
  // Handle creating a new burger
  const handleCreateNew = () => {
    resetBurger();
    setLocation('/build');
  };
  
  // Handle saving the burger
  const handleSave = async () => {
    if (!burger.name) {
      setBurgerName('My Custom Burger');
    }
    
    await saveBurgerMutation.mutateAsync(burger);
  };
  
  // Get ingredients for display
  const ingredientCounts = countIngredients(burger.ingredients);
  
  return (
    <div className="min-h-screen flex flex-col">
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
          <button 
            onClick={handleCreateNew}
            className="text-primary hover:text-opacity-80"
          >
            Create New Burger
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mx-auto">
          <h2 className="font-heading text-2xl font-bold mb-6 text-center">Your Masterpiece!</h2>
          
          {/* Final Burger Display */}
          <div className="flex justify-center mb-8">
            <BurgerPreview 
              ingredients={burger.ingredients}
              className="min-h-[250px]"
            />
          </div>
          
          {/* Burger Naming Form */}
          <div className="mb-6">
            <label htmlFor="burger-name" className="block text-sm font-medium text-gray-700 mb-2">
              Give your burger a name:
            </label>
            <Input
              type="text"
              id="burger-name"
              name="burger-name"
              value={burger.name}
              onChange={handleNameChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="e.g. The Double Deluxe"
            />
          </div>
          
          {/* Ingredients List */}
          <div className="mb-6">
            <h3 className="font-heading text-lg font-bold mb-2">Ingredients:</h3>
            <ul className="space-y-2">
              {ingredientCounts.map((item) => (
                <li key={item.ingredient.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span>{item.ingredient.displayName}</span>
                    <span className="text-gray-600 ml-2">{item.count > 1 ? `(x${item.count})` : ''}</span>
                  </div>
                  <span className="font-medium">
                    {formatPrice(typeof item.ingredient.price === 'string' ? parseFloat(item.ingredient.price) * item.count : item.ingredient.price * item.count)}
                  </span>
                </li>
              ))}
              
              {/* Total price display */}
              <li className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold">Total Price:</span>
                <span className="font-bold text-primary text-lg">
                  {formatPrice(calculateBurgerPrice(burger))}
                </span>
              </li>
            </ul>
          </div>
          
          {/* Save Button */}
          <div className="flex justify-center">
            <Button 
              onClick={handleSave}
              disabled={saveBurgerMutation.isPending}
              className="bg-primary hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              {saveBurgerMutation.isPending ? 'Saving...' : 'Save My Burger'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalPage;
