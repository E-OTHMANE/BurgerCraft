import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Ingredient types
export const ingredientTypes = [
  "bun",
  "patty",
  "cheese",
  "veggie",
  "sauce"
] as const;

export type IngredientType = typeof ingredientTypes[number];

// Define the ingredients table
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  type: text("type").notNull(),
  color: text("color").notNull(),
  height: integer("height").notNull(),
});

export const insertIngredientSchema = createInsertSchema(ingredients).omit({ 
  id: true 
});

export type Ingredient = typeof ingredients.$inferSelect;
export type InsertIngredient = z.infer<typeof insertIngredientSchema>;

// Define the burgers table
export const burgers = pgTable("burgers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: jsonb("ingredients").notNull(),
});

export const insertBurgerSchema = createInsertSchema(burgers).omit({ 
  id: true 
});

export type Burger = typeof burgers.$inferSelect;
export type InsertBurger = z.infer<typeof insertBurgerSchema>;
