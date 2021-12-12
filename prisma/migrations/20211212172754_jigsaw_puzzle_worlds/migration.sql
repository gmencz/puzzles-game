/*
  Warnings:

  - Added the required column `worldId` to the `JigsawPuzzleLevel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JigsawPuzzleLevel" ADD COLUMN     "worldId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "JigsawPuzzlesWorld" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JigsawPuzzlesWorld_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JigsawPuzzlesWorld_name_key" ON "JigsawPuzzlesWorld"("name");

-- AddForeignKey
ALTER TABLE "JigsawPuzzleLevel" ADD CONSTRAINT "JigsawPuzzleLevel_worldId_fkey" FOREIGN KEY ("worldId") REFERENCES "JigsawPuzzlesWorld"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
