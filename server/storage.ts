import { Ingredient, InsertIngredient, Burger, InsertBurger } from "@shared/schema";

export interface IStorage {
  // Ingredient related operations
  getAllIngredients(): Promise<Ingredient[]>;
  getIngredient(id: number): Promise<Ingredient | undefined>;
  getIngredientsByCategory(category: string): Promise<Ingredient[]>;
  createIngredient(ingredient: InsertIngredient): Promise<Ingredient>;
  
  // Burger related operations
  getAllBurgers(): Promise<Burger[]>;
  getBurger(id: number): Promise<Burger | undefined>;
  createBurger(burger: InsertBurger): Promise<Burger>;
}

export class MemStorage implements IStorage {
  private ingredients: Map<number, Ingredient>;
  private burgers: Map<number, Burger>;
  private ingredientId: number;
  private burgerId: number;

  constructor() {
    this.ingredients = new Map();
    this.burgers = new Map();
    this.ingredientId = 1;
    this.burgerId = 1;
    
    // Initialize with predefined ingredients
    this.initializeIngredients();
  }

  private initializeIngredients() {
    // Populate with predefined ingredients from client/src/data/ingredients.ts
    // This would be a database seeding operation in a real app
    const defaultIngredients: InsertIngredient[] = [
      // Buns
      {
        name: 'Brioche Bun',
        category: 'buns',
        color: 'bg-[#F0C080]',
        height: 20,
        width: 64,
        label: 'BUN'
      },
      {
        name: 'Sesame Bun',
        category: 'buns',
        color: 'bg-[#F0C080] opacity-80',
        height: 20,
        width: 64,
        label: 'BUN'
      },
      // ... more ingredients would be added here
    ];
    
    // Add each ingredient to the store
    defaultIngredients.forEach(ingredient => {
      this.createIngredient(ingredient);
    });
  }

  async getAllIngredients(): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values());
  }

  async getIngredient(id: number): Promise<Ingredient | undefined> {
    return this.ingredients.get(id);
  }

  async getIngredientsByCategory(category: string): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values()).filter(
      (ingredient) => ingredient.category === category
    );
  }

  async createIngredient(ingredient: InsertIngredient): Promise<Ingredient> {
    const id = this.ingredientId++;
    const newIngredient = { ...ingredient, id };
    this.ingredients.set(id, newIngredient);
    return newIngredient;
  }

  async getAllBurgers(): Promise<Burger[]> {
    return Array.from(this.burgers.values());
  }

  async getBurger(id: number): Promise<Burger | undefined> {
    return this.burgers.get(id);
  }

  async createBurger(burger: InsertBurger): Promise<Burger> {
    const id = this.burgerId++;
    const newBurger = { ...burger, id };
    this.burgers.set(id, newBurger);
    return newBurger;
  }
}

export const storage = new MemStorage();
