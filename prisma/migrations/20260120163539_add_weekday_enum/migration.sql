/*
  Warnings:

  - Changed the type of `weekDay` on the `HabitWeekDay` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "HabitWeekDay" DROP COLUMN "weekDay",
ADD COLUMN     "weekDay" "WeekDay" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "first_login" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "HabitWeekDay_habit_id_weekDay_key" ON "HabitWeekDay"("habit_id", "weekDay");
