import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IngredientCount, IngredientItem, SelectedIngredient } from "@/types/burger";

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
