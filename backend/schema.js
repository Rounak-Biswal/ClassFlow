import { numeric, pgTable, serial, text, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const carSchema = pgTable('carSchema', {
  id: serial('id').primaryKey(),
  brand: varchar('brand', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: integer('year').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  manufactured: timestamp('manufactured_date').defaultNow()
});