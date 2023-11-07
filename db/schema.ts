import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const attack_schedule = pgTable('attack_schedule', {
    id: serial("id").primaryKey(),
    created: timestamp("created").defaultNow(),
    start: timestamp("start").defaultNow(),
    duration: integer("duration").default(300),
    payload: text("payload")
});
