/*
  Warnings:

  - You are about to drop the column `episodeId` on the `LevelState` table. All the data in the column will be lost.
  - You are about to drop the `_LevelToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `levelId` to the `LevelState` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "LevelState" DROP CONSTRAINT "LevelState_episodeId_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToUser" DROP CONSTRAINT "_LevelToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LevelToUser" DROP CONSTRAINT "_LevelToUser_B_fkey";

-- AlterTable
ALTER TABLE "LevelState" DROP COLUMN "episodeId",
ADD COLUMN     "levelId" TEXT NOT NULL,
ADD COLUMN     "solved" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_LevelToUser";

-- AddForeignKey
ALTER TABLE "LevelState" ADD CONSTRAINT "LevelState_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
