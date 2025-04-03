import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertBurgerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  
  // Get all ingredients
  app.get("/api/ingredients", async (_req: Request, res: Response) => {
    try {
      const ingredients = await storage.getAllIngredients();
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ingredients" });
    }
  });

  // Get ingredients by category
  app.get("/api/ingredients/category/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const ingredients = await storage.getIngredientsByCategory(category);
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ingredients by category" });
    }
  });

  // Get a specific ingredient
  app.get("/api/ingredients/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ingredient ID" });
      }
      
      const ingredient = await storage.getIngredient(id);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      
      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ message: "Error fetching ingredient" });
    }
  });

  // Get all burgers
  app.get("/api/burgers", async (_req: Request, res: Response) => {
    try {
      const burgers = await storage.getAllBurgers();
      res.json(burgers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching burgers" });
    }
  });

  // Get a specific burger
  app.get("/api/burgers/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid burger ID" });
      }
      
      const burger = await storage.getBurger(id);
      if (!burger) {
        return res.status(404).json({ message: "Burger not found" });
      }
      
      res.json(burger);
    } catch (error) {
      res.status(500).json({ message: "Error fetching burger" });
    }
  });

  // Create a new burger
  app.post("/api/burgers", async (req: Request, res: Response) => {
    try {
      const validationResult = insertBurgerSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid burger data", 
          errors: validationResult.error.format() 
        });
      }
      
      const newBurger = await storage.createBurger(validationResult.data);
      res.status(201).json(newBurger);
    } catch (error) {
      res.status(500).json({ message: "Error creating burger" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
