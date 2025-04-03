import { createContext, useContext, useState, ReactNode } from 'react';
import { Ingredient, Burger } from '../types';
import { ingredients } from '../data/ingredients';

interface BurgerContextType {
  selectedIngredients: Ingredient[];
  burgerName: string;
  currentCategory: string;
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredientId: number) => void;
  updateBurgerName: (name: string) => void;
  setCurrentCategory: (category: string) => void;
  resetBurger: () => void;
  finishedBurger: Burger | null;
  saveBurger: () => void;
}

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

export const BurgerProvider = ({ children }: { children: ReactNode }) => {
  // Find the default bun (first in the list)
  const defaultBun = ingredients.find(ing => ing.category === 'buns');
  
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    defaultBun ? [defaultBun] : []
  );
  const [burgerName, setBurgerName] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('buns');
  const [finishedBurger, setFinishedBurger] = useState<Burger | null>(null);

  const addIngredient = (ingredient: Ingredient) => {
    // For buns, replace the current bun
    if (ingredient.category === 'buns') {
      const filteredIngredients = selectedIngredients.filter(
        ing => ing.category !== 'buns'
      );
      setSelectedIngredients([ingredient, ...filteredIngredients]);
    } else {
      // For other categories, add if not already present
      if (!selectedIngredients.some(ing => ing.id === ingredient.id)) {
        setSelectedIngredients([...selectedIngredients, ingredient]);
      }
    }
  };

  const removeIngredient = (ingredientId: number) => {
    // Don't allow removing the bun
    const ingredient = selectedIngredients.find(ing => ing.id === ingredientId);
    if (ingredient && ingredient.category === 'buns') return;

    setSelectedIngredients(
      selectedIngredients.filter(ing => ing.id !== ingredientId)
    );
  };

  const updateBurgerName = (name: string) => {
    setBurgerName(name);
  };

  const resetBurger = () => {
    // Reset burger but keep the default bun
    if (defaultBun) {
      setSelectedIngredients([defaultBun]);
    } else {
      setSelectedIngredients([]);
    }
    setBurgerName('');
    setCurrentCategory('buns');
    setFinishedBurger(null);
  };

  const saveBurger = () => {
    const burger: Burger = {
      name: burgerName || 'Unnamed Burger',
      ingredients: [...selectedIngredients]
    };
    setFinishedBurger(burger);
    // Here we would typically save to backend
  };

  return (
    <BurgerContext.Provider
      value={{
        selectedIngredients,
        burgerName,
        currentCategory,
        addIngredient,
        removeIngredient,
        updateBurgerName,
        setCurrentCategory,
        resetBurger,
        finishedBurger,
        saveBurger
      }}
    >
      {children}
    </BurgerContext.Provider>
  );
};

export const useBurger = () => {
  const context = useContext(BurgerContext);
  if (context === undefined) {
    throw new Error('useBurger must be used within a BurgerProvider');
  }
  return context;
};
