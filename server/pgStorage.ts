import { eq } from 'drizzle-orm';
import { db } from './db';
import { burgers, ingredients, type Burger, type InsertBurger, type Ingredient, type InsertIngredient } from '@shared/schema';
import { IStorage } from './storage';
import { log } from './vite';

export class PgStorage implements IStorage {
  // Ingredient operations
  async getAllIngredients(): Promise<Ingredient[]> {
    try {
      return await db.select().from(ingredients);
    } catch (error) {
      log(`Error getting all ingredients: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  async getIngredientsByType(type: string): Promise<Ingredient[]> {
    try {
      return await db.select().from(ingredients).where(eq(ingredients.type, type));
    } catch (error) {
      log(`Error getting ingredients by type: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  async getIngredient(id: number): Promise<Ingredient | undefined> {
    try {
      const result = await db.select().from(ingredients).where(eq(ingredients.id, id));
      return result[0];
    } catch (error) {
      log(`Error getting ingredient ${id}: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  async createIngredient(insertIngredient: InsertIngredient): Promise<Ingredient> {
    try {
      const result = await db.insert(ingredients).values(insertIngredient).returning();
      return result[0];
    } catch (error) {
      log(`Error creating ingredient: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  // Burger operations
  async getAllBurgers(): Promise<Burger[]> {
    try {
      return await db.select().from(burgers);
    } catch (error) {
      log(`Error getting all burgers: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  async getBurger(id: number): Promise<Burger | undefined> {
    try {
      const result = await db.select().from(burgers).where(eq(burgers.id, id));
      return result[0];
    } catch (error) {
      log(`Error getting burger ${id}: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  async createBurger(insertBurger: InsertBurger): Promise<Burger> {
    try {
      const result = await db.insert(burgers).values(insertBurger).returning();
      return result[0];
    } catch (error) {
      log(`Error creating burger: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }

  // Initialize the database with default ingredients if none exist
  async initializeWithDefaultIngredientsIfNeeded() {
    try {
      // Check if ingredients already exist
      const existingIngredients = await this.getAllIngredients();
      
      if (existingIngredients.length === 0) {
        log('No ingredients found in database. Adding default ingredients...', 'postgres');
        
        // Buns
        await this.createIngredient({
          name: "classic-bun",
          displayName: "Classic Bun",
          type: "bun",
          color: "bg-bun",
          height: 12
        });
        
        await this.createIngredient({
          name: "sesame-bun",
          displayName: "Sesame Bun",
          type: "bun",
          color: "bg-bun",
          height: 12
        });
        
        // Patties
        await this.createIngredient({
          name: "beef-patty",
          displayName: "Beef Patty",
          type: "patty",
          color: "bg-meat",
          height: 8
        });
        
        await this.createIngredient({
          name: "veggie-patty",
          displayName: "Veggie Patty",
          type: "patty",
          color: "bg-lettuce",
          height: 8
        });
        
        // Cheese
        await this.createIngredient({
          name: "cheddar",
          displayName: "Cheddar",
          type: "cheese",
          color: "bg-cheese",
          height: 4
        });
        
        await this.createIngredient({
          name: "swiss",
          displayName: "Swiss",
          type: "cheese",
          color: "bg-yellow-100",
          height: 4
        });
        
        // Veggies
        await this.createIngredient({
          name: "lettuce",
          displayName: "Lettuce",
          type: "veggie",
          color: "bg-lettuce",
          height: 4
        });
        
        await this.createIngredient({
          name: "tomato",
          displayName: "Tomato",
          type: "veggie",
          color: "bg-tomato",
          height: 4
        });
        
        await this.createIngredient({
          name: "onion",
          displayName: "Onion",
          type: "veggie",
          color: "bg-onion",
          height: 4
        });
        
        await this.createIngredient({
          name: "pickle",
          displayName: "Pickle",
          type: "veggie",
          color: "bg-green-300",
          height: 4
        });
        
        // Sauces
        await this.createIngredient({
          name: "ketchup",
          displayName: "Ketchup",
          type: "sauce",
          color: "bg-red-500",
          height: 2
        });
        
        await this.createIngredient({
          name: "mayo",
          displayName: "Mayo",
          type: "sauce",
          color: "bg-gray-100",
          height: 2
        });
        
        await this.createIngredient({
          name: "mustard",
          displayName: "Mustard",
          type: "sauce",
          color: "bg-yellow-400",
          height: 2
        });
        
        await this.createIngredient({
          name: "special-sauce",
          displayName: "Special Sauce",
          type: "sauce",
          color: "bg-orange-300",
          height: 2
        });
        
        log('Default ingredients added successfully', 'postgres');
      } else {
        log(`Database already contains ${existingIngredients.length} ingredients`, 'postgres');
      }
    } catch (error) {
      log(`Error initializing default ingredients: ${(error as Error).message}`, 'postgres');
      throw error;
    }
  }
}