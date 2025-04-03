CREATE TABLE "burgers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ingredients" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"type" text NOT NULL,
	"color" text NOT NULL,
	"height" integer NOT NULL
);
