import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const attack_schedule = pgTable('attack_schedule', {
    id: serial("id").primaryKey().notNull(),
    created: timestamp("created").defaultNow().notNull(),
    start: timestamp("start").defaultNow().notNull(),
    duration: integer("duration").default(300).notNull(),
    // Every null in postgres is unique, so this enforces only one row having value of true at one time
    // See https://stackoverflow.com/a/37460915/11918678
    in_progress: boolean("in_progress").unique(),
    payload: text("payload").notNull()
});
