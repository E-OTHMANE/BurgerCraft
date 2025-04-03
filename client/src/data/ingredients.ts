import { Ingredient, IngredientCategory } from '../types';

export const categories: IngredientCategory[] = [
  { id: 'buns', name: 'Buns' },
  { id: 'meats', name: 'Meats' },
  { id: 'cheese', name: 'Cheese' },
  { id: 'veggies', name: 'Veggies' },
  { id: 'sauces', name: 'Sauces' },
  { id: 'extras', name: 'Extras' }
];

export const ingredients: Ingredient[] = [
  // Buns
  {
    id: 1,
    name: 'Brioche Bun',
    category: 'buns',
    color: 'bg-[#F0C080]',
    height: 20,
    width: 64,
    label: 'BUN'
  },
  {
    id: 2,
    name: 'Sesame Bun',
    category: 'buns',
    color: 'bg-[#F0C080] opacity-80',
    height: 20,
    width: 64,
    label: 'BUN'
  },
  {
    id: 3,
    name: 'Potato Bun',
    category: 'buns',
    color: 'bg-[#F0C080] opacity-90',
    height: 20,
    width: 64,
    label: 'BUN'
  },
  {
    id: 4,
    name: 'Lettuce Wrap',
    category: 'buns',
    color: 'bg-gray-300',
    height: 20,
    width: 64,
    label: 'BUN'
  },
  
  // Meats
  {
    id: 5,
    name: 'Beef Patty',
    category: 'meats',
    color: 'bg-[#7C2D12]',
    height: 10,
    width: 260,
    label: 'BEEF'
  },
  {
    id: 6,
    name: 'Chicken Breast',
    category: 'meats',
    color: 'bg-amber-700',
    height: 10,
    width: 260,
    label: 'CHICK'
  },
  {
    id: 7,
    name: 'Veggie Patty',
    category: 'meats',
    color: 'bg-gray-600',
    height: 10,
    width: 260,
    label: 'VEG'
  },
  {
    id: 8,
    name: 'Fish Fillet',
    category: 'meats',
    color: 'bg-pink-300',
    height: 10,
    width: 260,
    label: 'FISH'
  },
  
  // Cheese
  {
    id: 9,
    name: 'Cheddar',
    category: 'cheese',
    color: 'bg-[#FACC15]',
    height: 6,
    width: 270,
    label: 'CHED'
  },
  {
    id: 10,
    name: 'American',
    category: 'cheese',
    color: 'bg-yellow-400',
    height: 6,
    width: 270,
    label: 'AMER'
  },
  {
    id: 11,
    name: 'Swiss',
    category: 'cheese',
    color: 'bg-yellow-200',
    height: 6,
    width: 270,
    label: 'SWISS'
  },
  {
    id: 12,
    name: 'Blue Cheese',
    category: 'cheese',
    color: 'bg-blue-200',
    height: 6,
    width: 270,
    label: 'BLUE'
  },
  
  // Veggies
  {
    id: 13,
    name: 'Lettuce',
    category: 'veggies',
    color: 'bg-[#84CC16]',
    height: 4,
    width: 275,
    label: 'LETT'
  },
  {
    id: 14,
    name: 'Tomato',
    category: 'veggies',
    color: 'bg-[#EF4444]',
    height: 6,
    width: 260,
    label: 'TOM'
  },
  {
    id: 15,
    name: 'Onion',
    category: 'veggies',
    color: 'bg-purple-200',
    height: 4,
    width: 265,
    label: 'ONI'
  },
  {
    id: 16,
    name: 'Pickle',
    category: 'veggies',
    color: 'bg-green-600',
    height: 3,
    width: 250,
    label: 'PICK'
  },
  
  // Sauces
  {
    id: 17,
    name: 'Ketchup',
    category: 'sauces',
    color: 'bg-red-600',
    height: 2,
    width: 265,
    label: 'KETCH'
  },
  {
    id: 18,
    name: 'Mustard',
    category: 'sauces',
    color: 'bg-yellow-500',
    height: 2,
    width: 265,
    label: 'MUST'
  },
  {
    id: 19,
    name: 'Mayo',
    category: 'sauces',
    color: 'bg-gray-100',
    height: 2,
    width: 265,
    label: 'MAYO'
  },
  {
    id: 20,
    name: 'BurgerFy Special Sauce',
    category: 'sauces',
    color: 'bg-orange-300',
    height: 2,
    width: 265,
    label: 'SPEC'
  },
  
  // Extras
  {
    id: 21,
    name: 'Bacon',
    category: 'extras',
    color: 'bg-red-800',
    height: 3,
    width: 240,
    label: 'BAC'
  },
  {
    id: 22,
    name: 'Fried Egg',
    category: 'extras',
    color: 'bg-yellow-100',
    height:.5,
    width: 250,
    label: 'EGG'
  },
  {
    id: 23,
    name: 'Avocado',
    category: 'extras',
    color: 'bg-green-300',
    height: 5,
    width: 255,
    label: 'AVO'
  },
  {
    id: 24,
    name: 'Jalapeños',
    category: 'extras',
    color: 'bg-green-500',
    height: 4,
    width: 245,
    label: 'JAL'
  }
];
