import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BurgerData, IngredientCount, IngredientItem, SelectedIngredient } from "@/types/burger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to count occurrences of ingredients
export function countIngredients(selectedIngredients: SelectedIngredient[]): IngredientCount[] {
  const counts: Map<number, IngredientCount> = new Map();
  
  selectedIngredients.forEach((selected) => {
    const { ingredient } = selected;
    const existing = counts.get(ingredient.id);
    
    if (existing) {
      counts.set(ingredient.id, {
        ...existing,
        count: existing.count + 1
      });
    } else {
      counts.set(ingredient.id, {
        ingredient,
        count: 1
      });
    }
  });
  
  return Array.from(counts.values());
}

// Group ingredients by their type
export function groupIngredientsByType(ingredients: IngredientItem[]) {
  const groupedIngredients: Record<string, IngredientItem[]> = {};
  
  ingredients.forEach((ingredient) => {
    if (!groupedIngredients[ingredient.type]) {
      groupedIngredients[ingredient.type] = [];
    }
    groupedIngredients[ingredient.type].push(ingredient);
  });
  
  return groupedIngredients;
}

// Format category name for display
export function formatCategoryName(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1) + 's';
}

// Calculate the total price of a burger based on its ingredients
export function calculateBurgerPrice(burger: BurgerData): number {
  if (!burger.ingredients.length) return 0;
  
  return burger.ingredients.reduce((total, item) => {
    // Add the price of each ingredient
    const price = typeof item.ingredient.price === 'string' ? parseFloat(item.ingredient.price) : (item.ingredient.price || 0);
    return total + price;
  }, 0);
}

// Format a price as a currency string
export function formatPrice(price: number | string): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return numericPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
