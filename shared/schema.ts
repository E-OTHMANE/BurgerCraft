import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Ingredient type for storing in database
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  color: text("color").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
  label: text("label").notNull(),
});

// Burger table to store user-created burgers
export const burgers = pgTable("burgers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: jsonb("ingredients").notNull(), // Store ingredients as JSON
});

export const insertIngredientSchema = createInsertSchema(ingredients).omit({
  id: true,
});

export const insertBurgerSchema = createInsertSchema(burgers).omit({
  id: true,
});

export type InsertIngredient = z.infer<typeof insertIngredientSchema>;
export type Ingredient = typeof ingredients.$inferSelect;

export type InsertBurger = z.infer<typeof insertBurgerSchema>;
export type Burger = typeof burgers.$inferSelect;
