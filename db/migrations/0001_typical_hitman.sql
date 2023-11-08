ALTER TABLE "attack_schedule" ALTER COLUMN "created" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attack_schedule" ALTER COLUMN "start" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attack_schedule" ALTER COLUMN "duration" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "attack_schedule" ALTER COLUMN "payload" SET NOT NULL;