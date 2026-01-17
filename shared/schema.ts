import { relations } from "drizzle-orm";
import { pgTable, text, integer, boolean, decimal, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  image: text("image"),
  productCount: integer("product_count").default(0),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  image: true,
  productCount: true,
});
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  image: text("image").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  isNew: boolean("is_new").default(false),
  isSoldOut: boolean("is_sold_out").default(false),
  madeToOrder: boolean("made_to_order").default(false),
  materials: text("materials"),
  careInstructions: text("care_instructions"),
  dimensions: text("dimensions"),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  slug: true,
  description: true,
  price: true,
  originalPrice: true,
  image: true,
  categoryId: true,
  isNew: true,
  isSoldOut: true,
  madeToOrder: true,
  materials: true,
  careInstructions: true,
  dimensions: true,
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Blog Posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content"),
  image: text("image").notNull(),
  category: text("category").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  slug: true,
  excerpt: true,
  content: true,
  image: true,
  category: true,
  author: true,
  readTime: true,
  publishedAt: true,
});
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

// Artist Profile
export const artistProfile = pgTable("artist_profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  story: text("story"),
  image: text("image"),
  instagramUrl: text("instagram_url"),
  pinterestUrl: text("pinterest_url"),
  etsyUrl: text("etsy_url"),
});

export const insertArtistProfileSchema = createInsertSchema(artistProfile).pick({
  name: true,
  bio: true,
  story: true,
  image: true,
  instagramUrl: true,
  pinterestUrl: true,
  etsyUrl: true,
});
export type InsertArtistProfile = z.infer<typeof insertArtistProfileSchema>;
export type ArtistProfile = typeof artistProfile.$inferSelect;

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
