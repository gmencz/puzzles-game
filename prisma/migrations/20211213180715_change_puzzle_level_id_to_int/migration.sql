/*
  Warnings:

  - The primary key for the `JigsawPuzzleLevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `number` on the `JigsawPuzzleLevel` table. All the data in the column will be lost.
  - The `id` column on the `JigsawPuzzleLevel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `JigsawPuzzleLevelCompletions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `jigsawPuzzleLevelId` on the `JigsawPuzzleLevelCompletions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "JigsawPuzzleLevelCompletions" DROP CONSTRAINT "JigsawPuzzleLevelCompletions_jigsawPuzzleLevelId_fkey";

-- AlterTable
ALTER TABLE "JigsawPuzzleLevel" DROP CONSTRAINT "JigsawPuzzleLevel_pkey",
DROP COLUMN "number",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "JigsawPuzzleLevel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "JigsawPuzzleLevelCompletions" DROP CONSTRAINT "JigsawPuzzleLevelCompletions_pkey",
DROP COLUMN "jigsawPuzzleLevelId",
ADD COLUMN     "jigsawPuzzleLevelId" INTEGER NOT NULL,
ADD CONSTRAINT "JigsawPuzzleLevelCompletions_pkey" PRIMARY KEY ("userId", "jigsawPuzzleLevelId");

-- AddForeignKey
ALTER TABLE "JigsawPuzzleLevelCompletions" ADD CONSTRAINT "JigsawPuzzleLevelCompletions_jigsawPuzzleLevelId_fkey" FOREIGN KEY ("jigsawPuzzleLevelId") REFERENCES "JigsawPuzzleLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
