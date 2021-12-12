/*
  Warnings:

  - You are about to drop the column `worldId` on the `JigsawPuzzleLevel` table. All the data in the column will be lost.
  - You are about to drop the `JigsawPuzzlesWorld` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `topicId` to the `JigsawPuzzleLevel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JigsawPuzzleLevel" DROP CONSTRAINT "JigsawPuzzleLevel_worldId_fkey";

-- DropIndex
DROP INDEX "JigsawPuzzleLevel_number_key";

-- AlterTable
ALTER TABLE "JigsawPuzzleLevel" DROP COLUMN "worldId",
ADD COLUMN     "topicId" TEXT NOT NULL;

-- DropTable
DROP TABLE "JigsawPuzzlesWorld";

-- CreateTable
CREATE TABLE "JigsawPuzzlesTopic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JigsawPuzzlesTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JigsawPuzzlesTopicRequiredCompletions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "JigsawPuzzlesTopic_name_key" ON "JigsawPuzzlesTopic"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_JigsawPuzzlesTopicRequiredCompletions_AB_unique" ON "_JigsawPuzzlesTopicRequiredCompletions"("A", "B");

-- CreateIndex
CREATE INDEX "_JigsawPuzzlesTopicRequiredCompletions_B_index" ON "_JigsawPuzzlesTopicRequiredCompletions"("B");

-- AddForeignKey
ALTER TABLE "JigsawPuzzleLevel" ADD CONSTRAINT "JigsawPuzzleLevel_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "JigsawPuzzlesTopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JigsawPuzzlesTopicRequiredCompletions" ADD FOREIGN KEY ("A") REFERENCES "JigsawPuzzlesTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JigsawPuzzlesTopicRequiredCompletions" ADD FOREIGN KEY ("B") REFERENCES "JigsawPuzzlesTopic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
