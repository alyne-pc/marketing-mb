import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Unique identifier (openId or email-based). */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  password: varchar("password", { length: 255 }), // Hashed password for local auth
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "manager"]).default("user").notNull(),
  area: varchar("area", { length: 255 }), // Department/Area of the user
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Inventory/Stock table - tracks available t-shirts by size
 */
export const inventory = mysqlTable("inventory", {
  id: int("id").autoincrement().primaryKey(),
  size: mysqlEnum("size", ["P", "M", "G", "GG"]).notNull(),
  quantity: int("quantity").notNull().default(0),
  costPerUnit: decimal("costPerUnit", { precision: 10, scale: 2 }).notNull(), // Cost we paid for each shirt
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Inventory = typeof inventory.$inferSelect;
export type InsertInventory = typeof inventory.$inferInsert;

/**
 * Requests table - tracks t-shirt requests from users
 */
export const requests = mysqlTable("requests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  telefone: varchar("telefone", { length: 20 }),
  matricula: varchar("matricula", { length: 50 }).notNull(),
  area: varchar("area", { length: 255 }).notNull(),
  gestor: varchar("gestor", { length: 255 }), // Manager name
  size: mysqlEnum("size", ["P", "M", "G", "GG"]).notNull(),
  model: mysqlEnum("model", ["tradicional", "baby-look"]).notNull(),
  isFirstRequest: int("isFirstRequest").default(1).notNull(), // 1 = true, 0 = false
  lastRequestDate: timestamp("lastRequestDate"), // Date of last request if not first
  motivo: text("motivo"), // Reason for request
  status: mysqlEnum("status", ["aguardando", "aprovada", "aguardando_entrega", "entregue", "rejeitada"]).default("aguardando").notNull(),
  approvedBy: int("approvedBy"), // Manager ID who approved
  approvedAt: timestamp("approvedAt"),
  deliveredBy: int("deliveredBy"), // Marketing person who delivered
  deliveredAt: timestamp("deliveredAt"),
  rejectionReason: text("rejectionReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Request = typeof requests.$inferSelect;
export type InsertRequest = typeof requests.$inferInsert;

/**
 * Area statistics - tracks total shirts and spending per area
 */
export const areaStats = mysqlTable("areaStats", {
  id: int("id").autoincrement().primaryKey(),
  area: varchar("area", { length: 255 }).notNull().unique(),
  totalShirts: int("totalShirts").notNull().default(0),
  totalSpent: decimal("totalSpent", { precision: 12, scale: 2 }).notNull().default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AreaStats = typeof areaStats.$inferSelect;
export type InsertAreaStats = typeof areaStats.$inferInsert;

/**
 * Managers table - tracks managers by area
 */
export const managers = mysqlTable("managers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  area: varchar("area", { length: 255 }).notNull(),
  userId: int("userId"), // Reference to users table for OAuth integration
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Manager = typeof managers.$inferSelect;
export type InsertManager = typeof managers.$inferInsert;
