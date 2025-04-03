import { pgTable, text, serial, integer, boolean, jsonb, timestamp, uniqueIndex, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Ingredient types
export const ingredientTypes = [
  "bun",
  "patty",
  "cheese",
  "veggie",
  "sauce"
] as const;

export type IngredientType = typeof ingredientTypes[number];

// Define the users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  age: integer("age"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    emailIdx: uniqueIndex("email_idx").on(table.email),
  };
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

// Define the ingredients table
export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  displayName: text("display_name").notNull(),
  type: text("type").notNull(),
  color: text("color").notNull(),
  height: integer("height").notNull(),
  price: decimal("price", { precision: 6, scale: 2 }).default("1.00").notNull(),
});

// Create the base schema 
const baseIngredientSchema = createInsertSchema(ingredients).omit({ 
  id: true 
});

// Extend the base schema to support both string and number price types
export const insertIngredientSchema = baseIngredientSchema.extend({
  price: z.union([z.string(), z.number()]).transform(val => 
    typeof val === 'number' ? val.toString() : val
  )
});

// Original type from database
type OriginalIngredient = typeof ingredients.$inferSelect;

// Extended type with string or number price
export type Ingredient = Omit<OriginalIngredient, 'price'> & {
  price: string | number;
};
export type InsertIngredient = z.infer<typeof insertIngredientSchema>;

// Define the burgers table with user relationship
export const burgers = pgTable("burgers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ingredients: jsonb("ingredients").notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBurgerSchema = createInsertSchema(burgers).omit({ 
  id: true,
  createdAt: true
});

export type Burger = typeof burgers.$inferSelect;
export type InsertBurger = z.infer<typeof insertBurgerSchema>;

// Define relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  burgers: many(burgers),
}));

export const burgersRelations = relations(burgers, ({ one }) => ({
  creator: one(users, {
    fields: [burgers.userId],
    references: [users.id],
  }),
}));
