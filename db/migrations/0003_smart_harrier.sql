DO $$ BEGIN
 CREATE TYPE "device_state" AS ENUM('idle', 'offline', 'attacking', 'never_connected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "device_type" AS ENUM('pico', 'pico-w');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "event_type" AS ENUM('payload_exec', 'boot_up', 'new_device');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "devices" (
	"id" text PRIMARY KEY DEFAULT 'board_McnzNvQ1xY3ey4ha' NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"last_seen" timestamp,
	"device_type" "device_type" DEFAULT 'pico-w' NOT NULL,
	"device_state" "device_state" DEFAULT 'never_connected' NOT NULL,
	"api_key" text DEFAULT 'sk_api_EvVux8rnJkPcaRBs66TylueO' NOT NULL,
	"trusted" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" text PRIMARY KEY DEFAULT 'event_PF2XIAwR6W9OzIBF' NOT NULL,
	"device_id" text,
	"attack_id" text,
	"created" timestamp DEFAULT now() NOT NULL,
	"event_type" "event_type" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attack_schedule" RENAME TO "attacks";--> statement-breakpoint
ALTER TABLE "attacks" DROP CONSTRAINT "attack_schedule_in_progress_unique";--> statement-breakpoint
ALTER TABLE "attacks" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "attacks" ALTER COLUMN "id" SET DEFAULT 'attack_Q4fHtTLcLEQC3M9F';--> statement-breakpoint
ALTER TABLE "attacks" ADD CONSTRAINT "attacks_in_progress_unique" UNIQUE("in_progress");