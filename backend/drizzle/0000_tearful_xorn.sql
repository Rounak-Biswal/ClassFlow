CREATE TABLE "carSchema" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand" varchar(100) NOT NULL,
	"model" varchar(100) NOT NULL,
	"year" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"manufactured_date" timestamp DEFAULT now()
);
