import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBurgerSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all ingredients
  app.get("/api/ingredients", async (req, res) => {
    try {
      const ingredients = await storage.getAllIngredients();
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ingredients" });
    }
  });

  // Get ingredients by type
  app.get("/api/ingredients/type/:type", async (req, res) => {
    try {
      const type = req.params.type;
      const ingredients = await storage.getIngredientsByType(type);
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ingredients by type" });
    }
  });

  // Get a specific ingredient
  app.get("/api/ingredients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ingredient ID" });
      }
      
      const ingredient = await storage.getIngredient(id);
      if (!ingredient) {
        return res.status(404).json({ error: "Ingredient not found" });
      }
      
      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch ingredient" });
    }
  });

  // Create a new burger
  app.post("/api/burgers", async (req, res) => {
    try {
      const validatedData = insertBurgerSchema.parse(req.body);
      const burger = await storage.createBurger(validatedData);
      res.status(201).json(burger);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      res.status(500).json({ error: "Failed to create burger" });
    }
  });

  // Get all burgers
  app.get("/api/burgers", async (req, res) => {
    try {
      const burgers = await storage.getAllBurgers();
      res.json(burgers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch burgers" });
    }
  });

  // Get a specific burger
  app.get("/api/burgers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid burger ID" });
      }
      
      const burger = await storage.getBurger(id);
      if (!burger) {
        return res.status(404).json({ error: "Burger not found" });
      }
      
      res.json(burger);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch burger" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
