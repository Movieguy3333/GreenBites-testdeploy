ALTER TABLE "foods" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "foods" CASCADE;--> statement-breakpoint
ALTER TABLE "foodLog" DROP CONSTRAINT "foodLog_foodID_foods_foodID_fk";
--> statement-breakpoint
ALTER TABLE "foodLog" ALTER COLUMN "loggedAt" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "foodLog" ALTER COLUMN "loggedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "foodLog" ALTER COLUMN "loggedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "foodLog" ALTER COLUMN "carbonFootPrintValue" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "bmi" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "totalCarbonFootPrint" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "foodLog" DROP COLUMN "foodID";