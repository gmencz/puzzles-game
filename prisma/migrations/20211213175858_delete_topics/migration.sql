/*
  Warnings:

  - You are about to drop the column `topicId` on the `JigsawPuzzleLevel` table. All the data in the column will be lost.
  - You are about to drop the `JigsawPuzzlesTopic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_JigsawPuzzlesTopicRequiredCompletions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JigsawPuzzleLevel" DROP CONSTRAINT "JigsawPuzzleLevel_topicId_fkey";

-- DropForeignKey
ALTER TABLE "_JigsawPuzzlesTopicRequiredCompletions" DROP CONSTRAINT "_JigsawPuzzlesTopicRequiredCompletions_A_fkey";

-- DropForeignKey
ALTER TABLE "_JigsawPuzzlesTopicRequiredCompletions" DROP CONSTRAINT "_JigsawPuzzlesTopicRequiredCompletions_B_fkey";

-- AlterTable
ALTER TABLE "JigsawPuzzleLevel" DROP COLUMN "topicId";

-- DropTable
DROP TABLE "JigsawPuzzlesTopic";

-- DropTable
DROP TABLE "_JigsawPuzzlesTopicRequiredCompletions";
