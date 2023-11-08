import { boolean, integer, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { generateApiKey, generateAttackId, generateBoardId, generateEventId } from '../utils/nanoid';
import { relations } from 'drizzle-orm';

export const deviceTypesEnum = pgEnum("device_type", ["pico", "pico-w"]);
export const deviceStatesEnum = pgEnum("device_state", ["idle", "offline", "attacking", "never_connected"]);
export const eventTypesEnum = pgEnum("event_type", ["payload_exec", "boot_up", "new_device"]);

export const attacks = pgTable('attacks', {
    id: text("id").default(generateAttackId()).primaryKey().notNull(),
    created: timestamp("created").defaultNow().notNull(),
    start: timestamp("start").defaultNow().notNull(),
    duration: integer("duration").default(300).notNull(),
    // Every null in postgres is unique, so this enforces only one row having value of true at one time
    // See https://stackoverflow.com/a/37460915/11918678
    in_progress: boolean("in_progress").unique(),
    payload: text("payload").notNull()
});

export const attackRelations = relations(attacks, ({ many }) => ({
    events: many(events)
}))

export const devices = pgTable("devices", {
    id: text("id").default(generateBoardId()).primaryKey().notNull(),
    created: timestamp("created").defaultNow().notNull(),
    last_seen: timestamp("last_seen"),
    device_type: deviceTypesEnum("device_type").default("pico-w").notNull(),
    device_state: deviceStatesEnum("device_state").default("never_connected").notNull(),
    api_key: text("api_key").default(generateApiKey()).notNull(),
    trusted: boolean("trusted").notNull().default(false)
})

export const deviceRelations = relations(devices, ({ many }) => ({
    events: many(events)
}))

export const events = pgTable("events", {
    id: text("id").default(generateEventId()).primaryKey().notNull(),
    device_id: text("device_id"),
    attack_id: text("attack_id"),
    created: timestamp("created").defaultNow().notNull(),
    event_type: eventTypesEnum("event_type").notNull()
})

export const eventRelations = relations(events, ({ one }) => ({
    device: one(devices, {
        fields: [events.device_id],
        references: [devices.id]
    }),
    attack: one(attacks, {
        fields: [events.attack_id],
        references: [attacks.id]
    })
}))
