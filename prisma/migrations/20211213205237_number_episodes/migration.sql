/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Episode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Episode" ADD COLUMN     "number" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Episode_number_key" ON "Episode"("number");
