export interface Ingredient {
  id: number;
  name: string;
  category: 
    | 'buns' 
    | 'meats' 
    | 'cheese' 
    | 'veggies' 
    | 'sauces' 
    | 'extras';
  color: string;
  height: number;
  width: number;
  label: string;
}

export interface IngredientCategory {
  id: string;
  name: string;
}

export interface Burger {
  id?: number;
  name: string;
  ingredients: Ingredient[];
}
