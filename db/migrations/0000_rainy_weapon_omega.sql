CREATE TABLE IF NOT EXISTS "attack_schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now(),
	"start" timestamp DEFAULT now(),
	"duration" integer DEFAULT 300,
	"payload" text
);
