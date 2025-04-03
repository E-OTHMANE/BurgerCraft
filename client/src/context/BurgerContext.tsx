import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { IngredientItem, SelectedIngredient, BurgerData } from '@/types/burger';

// Define the state type
interface BurgerState {
  burger: BurgerData;
  ingredients: IngredientItem[];
  isLoading: boolean;
  error: string | null;
}

// Define action types
type BurgerAction =
  | { type: 'ADD_INGREDIENT'; payload: IngredientItem }
  | { type: 'REMOVE_INGREDIENT'; payload: string }
  | { type: 'RESET_BURGER' }
  | { type: 'SET_BURGER_NAME'; payload: string }
  | { type: 'SET_INGREDIENTS'; payload: IngredientItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Create the context
interface BurgerContextType {
  state: BurgerState;
  addIngredient: (ingredient: IngredientItem) => void;
  removeIngredient: (selectionId: string) => void;
  resetBurger: () => void;
  setBurgerName: (name: string) => void;
  setIngredients: (ingredients: IngredientItem[]) => void;
}

const BurgerContext = createContext<BurgerContextType | undefined>(undefined);

// Initial state
const initialState: BurgerState = {
  burger: {
    name: '',
    ingredients: [],
  },
  ingredients: [],
  isLoading: true,
  error: null,
};

// Reducer function
function burgerReducer(state: BurgerState, action: BurgerAction): BurgerState {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,
        burger: {
          ...state.burger,
          ingredients: [
            ...state.burger.ingredients,
            {
              selectionId: `${action.payload.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              ingredient: action.payload,
            },
          ],
        },
      };
    
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        burger: {
          ...state.burger,
          ingredients: state.burger.ingredients.filter(
            (item) => item.selectionId !== action.payload
          ),
        },
      };
    
    case 'RESET_BURGER':
      return {
        ...state,
        burger: {
          name: '',
          ingredients: [],
        },
      };
    
    case 'SET_BURGER_NAME':
      return {
        ...state,
        burger: {
          ...state.burger,
          name: action.payload,
        },
      };
    
    case 'SET_INGREDIENTS':
      return {
        ...state,
        ingredients: action.payload,
        isLoading: false,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    default:
      return state;
  }
}

// Provider component
export const BurgerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(burgerReducer, initialState);

  const addIngredient = (ingredient: IngredientItem) => {
    dispatch({ type: 'ADD_INGREDIENT', payload: ingredient });
  };

  const removeIngredient = (selectionId: string) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: selectionId });
  };

  const resetBurger = () => {
    dispatch({ type: 'RESET_BURGER' });
  };

  const setBurgerName = (name: string) => {
    dispatch({ type: 'SET_BURGER_NAME', payload: name });
  };

  const setIngredients = (ingredients: IngredientItem[]) => {
    dispatch({ type: 'SET_INGREDIENTS', payload: ingredients });
  };

  return (
    <BurgerContext.Provider
      value={{ state, addIngredient, removeIngredient, resetBurger, setBurgerName, setIngredients }}
    >
      {children}
    </BurgerContext.Provider>
  );
};

// Hook to use the context
export const useBurgerContext = () => {
  const context = useContext(BurgerContext);
  if (context === undefined) {
    throw new Error('useBurgerContext must be used within a BurgerProvider');
  }
  return context;
};
