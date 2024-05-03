import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum('status', ['done', 'pending', 'false']);

export const todo = pgTable("todo", {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => userProgress.userId, { onDelete: "cascade" }).notNull(),
    text: text("text").notNull(),
    status: statusEnum("status").default("pending").notNull(),
  });
  
  export const todoRelations = relations(todo, ({ one }) => ({
    todo: one(userProgress, {
        fields: [todo.userId],
        references: [userProgress.userId],
    }),
}));

  export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),

  });

export const userProgressRelations = relations(userProgress, ({ many }) => ({
    userProgress: many(todo),
}));