import { eq } from 'drizzle-orm';
import { db } from './db';
import { burgers, ingredients, type Burger, type InsertBurger, type Ingredient, type InsertIngredient } from '@shared/schema';
import { IStorage } from './storage';
import { log } from './vite';

// Maximum number of retries for database operations
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Helper function to retry database operations
async function withRetry<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
  let lastError;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const isLastAttempt = attempt === MAX_RETRIES;
      
      if (!isLastAttempt) {
        log(`Retrying ${operationName} after failure (attempt ${attempt}/${MAX_RETRIES}): ${(error as Error).message}`, 'postgres');
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  // If we got here, all retries failed
  log(`All ${MAX_RETRIES} attempts for ${operationName} failed: ${(lastError as Error).message}`, 'postgres');
  throw lastError;
}

export class PgStorage implements IStorage {
  // Ingredient operations
  async getAllIngredients(): Promise<Ingredient[]> {
    return withRetry(async () => {
      return await db.select().from(ingredients);
    }, 'getAllIngredients');
  }

  async getIngredientsByType(type: string): Promise<Ingredient[]> {
    return withRetry(async () => {
      return await db.select().from(ingredients).where(eq(ingredients.type, type));
    }, 'getIngredientsByType');
  }

  async getIngredient(id: number): Promise<Ingredient | undefined> {
    return withRetry(async () => {
      const result = await db.select().from(ingredients).where(eq(ingredients.id, id));
      return result[0];
    }, `getIngredient(${id})`);
  }

  async createIngredient(insertIngredient: InsertIngredient): Promise<Ingredient> {
    return withRetry(async () => {
      const result = await db.insert(ingredients).values(insertIngredient).returning();
      return result[0];
    }, 'createIngredient');
  }

  // Burger operations
  async getAllBurgers(): Promise<Burger[]> {
    return withRetry(async () => {
      return await db.select().from(burgers);
    }, 'getAllBurgers');
  }

  async getBurger(id: number): Promise<Burger | undefined> {
    return withRetry(async () => {
      const result = await db.select().from(burgers).where(eq(burgers.id, id));
      return result[0];
    }, `getBurger(${id})`);
  }

  async createBurger(insertBurger: InsertBurger): Promise<Burger> {
    return withRetry(async () => {
      const result = await db.insert(burgers).values(insertBurger).returning();
      return result[0];
    }, 'createBurger');
  }

  // Initialize the database with default ingredients if none exist
  async initializeWithDefaultIngredientsIfNeeded() {
    return withRetry(async () => {
      // Check if ingredients already exist
      const existingIngredients = await this.getAllIngredients();
      
      if (existingIngredients.length === 0) {
        log('No ingredients found in database. Adding default ingredients...', 'postgres');
        
        // Create a batch of promises for all ingredient creation operations
        const defaultIngredients: InsertIngredient[] = [
          // Buns
          {
            name: "classic-bun",
            displayName: "Classic Bun",
            type: "bun",
            color: "bg-bun",
            height: 12
          },
          {
            name: "sesame-bun",
            displayName: "Sesame Bun",
            type: "bun",
            color: "bg-bun",
            height: 12
          },
          // Patties
          {
            name: "beef-patty",
            displayName: "Beef Patty",
            type: "patty",
            color: "bg-meat",
            height: 8
          },
          {
            name: "veggie-patty",
            displayName: "Veggie Patty",
            type: "patty",
            color: "bg-lettuce",
            height: 8
          },
          // Cheese
          {
            name: "cheddar",
            displayName: "Cheddar",
            type: "cheese",
            color: "bg-cheese",
            height: 4
          },
          {
            name: "swiss",
            displayName: "Swiss",
            type: "cheese",
            color: "bg-yellow-100",
            height: 4
          },
          // Veggies
          {
            name: "lettuce",
            displayName: "Lettuce",
            type: "veggie",
            color: "bg-lettuce",
            height: 4
          },
          {
            name: "tomato",
            displayName: "Tomato",
            type: "veggie",
            color: "bg-tomato",
            height: 4
          },
          {
            name: "onion",
            displayName: "Onion",
            type: "veggie",
            color: "bg-onion",
            height: 4
          },
          {
            name: "pickle",
            displayName: "Pickle",
            type: "veggie",
            color: "bg-green-300",
            height: 4
          },
          // Sauces
          {
            name: "ketchup",
            displayName: "Ketchup",
            type: "sauce",
            color: "bg-red-500",
            height: 2
          },
          {
            name: "mayo",
            displayName: "Mayo",
            type: "sauce",
            color: "bg-gray-100",
            height: 2
          },
          {
            name: "mustard",
            displayName: "Mustard",
            type: "sauce",
            color: "bg-yellow-400",
            height: 2
          },
          {
            name: "special-sauce",
            displayName: "Special Sauce",
            type: "sauce",
            color: "bg-orange-300",
            height: 2
          }
        ];
        
        // Create ingredients sequentially to avoid overwhelming the database
        for (const ingredient of defaultIngredients) {
          await this.createIngredient(ingredient);
        }
        
        log('Default ingredients added successfully', 'postgres');
      } else {
        log(`Database already contains ${existingIngredients.length} ingredients`, 'postgres');
      }
      
      return true;
    }, 'initializeWithDefaultIngredientsIfNeeded');
  }
}