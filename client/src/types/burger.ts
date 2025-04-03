// Ingredient types
export type IngredientType = 'bun' | 'patty' | 'cheese' | 'veggie' | 'sauce';

export interface IngredientItem {
  id: number;
  name: string;
  displayName: string;
  type: IngredientType;
  color: string;
  height: number;
  price: number | string;
}

// Selected ingredient with unique selection ID
export interface SelectedIngredient {
  selectionId: string; // Unique ID for this particular selection
  ingredient: IngredientItem;
}

// Burger structure
export interface BurgerData {
  name: string;
  ingredients: SelectedIngredient[];
}

// Category data structure
export interface IngredientCategory {
  id: string;
  name: string;
  ingredients: IngredientItem[];
}

// Used for grouping ingredients in the UI
export interface IngredientCount {
  ingredient: IngredientItem;
  count: number;
}
