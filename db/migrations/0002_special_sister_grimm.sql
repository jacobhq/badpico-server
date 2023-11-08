ALTER TABLE "attack_schedule" ADD COLUMN "in_progress" boolean;--> statement-breakpoint
ALTER TABLE "attack_schedule" ADD CONSTRAINT "attack_schedule_in_progress_unique" UNIQUE("in_progress");