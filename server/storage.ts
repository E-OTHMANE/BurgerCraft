import { burgers, ingredients, users, type Burger, type InsertBurger, type Ingredient, type InsertIngredient, type User, type InsertUser } from "@shared/schema";
import { log } from './vite';

export interface IStorage {
  // Ingredient operations
  getAllIngredients(): Promise<Ingredient[]>;
  getIngredientsByType(type: string): Promise<Ingredient[]>;
  getIngredient(id: number): Promise<Ingredient | undefined>;
  createIngredient(ingredient: InsertIngredient): Promise<Ingredient>;
  
  // Burger operations
  getAllBurgers(): Promise<Burger[]>;
  getBurgersByUserId(userId: number): Promise<Burger[]>;
  getBurger(id: number): Promise<Burger | undefined>;
  createBurger(burger: InsertBurger): Promise<Burger>;

  // User operations
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private ingredients: Map<number, Ingredient>;
  private burgers: Map<number, Burger>;
  private users: Map<number, User>;
  private ingredientId: number;
  private burgerId: number;
  private userId: number;

  constructor() {
    this.ingredients = new Map();
    this.burgers = new Map();
    this.users = new Map();
    this.ingredientId = 1;
    this.burgerId = 1;
    this.userId = 1;
    
    // Initialize with default ingredients
    this.initializeIngredients();
  }

  // Initialize default ingredients
  private initializeIngredients() {
    // Buns
    this.createIngredient({
      name: "classic-bun",
      displayName: "Classic Bun",
      type: "bun",
      color: "bg-bun",
      height: 12,
      price: "0.50"
    });
    
    this.createIngredient({
      name: "sesame-bun",
      displayName: "Sesame Bun",
      type: "bun",
      color: "bg-bun",
      height: 12,
      price: 0.75
    });
    
    // Patties
    this.createIngredient({
      name: "beef-patty",
      displayName: "Beef Patty",
      type: "patty",
      color: "bg-meat",
      height: 8,
      price: 2.5
    });
    
    this.createIngredient({
      name: "veggie-patty",
      displayName: "Veggie Patty",
      type: "patty",
      color: "bg-lettuce",
      height: 8,
      price: 2.0
    });
    
    // Cheese
    this.createIngredient({
      name: "cheddar",
      displayName: "Cheddar",
      type: "cheese",
      color: "bg-cheese",
      height: 4,
      price: 0.75
    });
    
    this.createIngredient({
      name: "swiss",
      displayName: "Swiss",
      type: "cheese",
      color: "bg-yellow-100",
      height: 4,
      price: 1.0
    });
    
    // Veggies
    this.createIngredient({
      name: "lettuce",
      displayName: "Lettuce",
      type: "veggie",
      color: "bg-lettuce",
      height: 4,
      price: 0.25
    });
    
    this.createIngredient({
      name: "tomato",
      displayName: "Tomato",
      type: "veggie",
      color: "bg-tomato",
      height: 4,
      price: 0.5
    });
    
    this.createIngredient({
      name: "onion",
      displayName: "Onion",
      type: "veggie",
      color: "bg-onion",
      height: 4,
      price: 0.25
    });
    
    this.createIngredient({
      name: "pickle",
      displayName: "Pickle",
      type: "veggie",
      color: "bg-green-300",
      height: 4,
      price: 0.35
    });
    
    // Sauces
    this.createIngredient({
      name: "ketchup",
      displayName: "Ketchup",
      type: "sauce",
      color: "bg-red-500",
      height: 2,
      price: 0.15
    });
    
    this.createIngredient({
      name: "mayo",
      displayName: "Mayo",
      type: "sauce",
      color: "bg-gray-100",
      height: 2,
      price: 0.15
    });
    
    this.createIngredient({
      name: "mustard",
      displayName: "Mustard",
      type: "sauce",
      color: "bg-yellow-400",
      height: 2,
      price: 0.15
    });
    
    this.createIngredient({
      name: "special-sauce",
      displayName: "Special Sauce",
      type: "sauce",
      color: "bg-orange-300",
      height: 2,
      price: 0.5
    });
  }

  // Ingredient methods
  async getAllIngredients(): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values());
  }

  async getIngredientsByType(type: string): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values()).filter(
      (ingredient) => ingredient.type === type
    );
  }

  async getIngredient(id: number): Promise<Ingredient | undefined> {
    return this.ingredients.get(id);
  }

  async createIngredient(insertIngredient: InsertIngredient): Promise<Ingredient> {
    const id = this.ingredientId++;
    const ingredient: Ingredient = { ...insertIngredient, id };
    this.ingredients.set(id, ingredient);
    return ingredient;
  }

  // Burger methods
  async getAllBurgers(): Promise<Burger[]> {
    return Array.from(this.burgers.values());
  }

  async getBurger(id: number): Promise<Burger | undefined> {
    return this.burgers.get(id);
  }

  async createBurger(insertBurger: InsertBurger): Promise<Burger> {
    const id = this.burgerId++;
    const burger: Burger = { 
      ...insertBurger, 
      id,
      userId: insertBurger.userId || null, // Ensure userId is never undefined
      createdAt: new Date() 
    };
    this.burgers.set(id, burger);
    return burger;
  }

  async getBurgersByUserId(userId: number): Promise<Burger[]> {
    return Array.from(this.burgers.values()).filter(
      (burger) => burger.userId === userId
    );
  }

  // User methods
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = {
      ...insertUser,
      id,
      age: insertUser.age || null, // Ensure age is never undefined
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
}

// Create the storage instance
// This will be replaced with PostgreSQL implementation in index.ts
export const storage: IStorage = new MemStorage();
