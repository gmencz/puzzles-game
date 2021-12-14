/*
  Warnings:

  - You are about to drop the `JigsawPuzzleLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JigsawPuzzleLevelCompletions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JigsawPuzzleLevelCompletions" DROP CONSTRAINT "JigsawPuzzleLevelCompletions_jigsawPuzzleLevelId_fkey";

-- DropForeignKey
ALTER TABLE "JigsawPuzzleLevelCompletions" DROP CONSTRAINT "JigsawPuzzleLevelCompletions_userId_fkey";

-- DropTable
DROP TABLE "JigsawPuzzleLevel";

-- DropTable
DROP TABLE "JigsawPuzzleLevelCompletions";

-- CreateTable
CREATE TABLE "LevelState" (
    "id" TEXT NOT NULL,
    "episodeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LevelState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelStateTile" (
    "id" TEXT NOT NULL,
    "tileOffsetX" INTEGER NOT NULL,
    "tileOffsetY" INTEGER NOT NULL,
    "tileWidth" INTEGER NOT NULL,
    "tileHeight" INTEGER NOT NULL,
    "correctPosition" INTEGER NOT NULL,
    "currentPosXPerc" INTEGER NOT NULL,
    "currentPosYPerc" INTEGER NOT NULL,
    "solved" BOOLEAN NOT NULL,
    "levelStateId" TEXT,

    CONSTRAINT "LevelStateTile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,
    "rows" INTEGER NOT NULL,
    "cols" INTEGER NOT NULL,
    "episodeId" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Episode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LevelToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "LevelState_userId_key" ON "LevelState"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Level_number_episodeId_key" ON "Level"("number", "episodeId");

-- CreateIndex
CREATE UNIQUE INDEX "Episode_name_key" ON "Episode"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToUser_AB_unique" ON "_LevelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToUser_B_index" ON "_LevelToUser"("B");

-- AddForeignKey
ALTER TABLE "LevelState" ADD CONSTRAINT "LevelState_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelState" ADD CONSTRAINT "LevelState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LevelStateTile" ADD CONSTRAINT "LevelStateTile_levelStateId_fkey" FOREIGN KEY ("levelStateId") REFERENCES "LevelState"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Level" ADD CONSTRAINT "Level_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToUser" ADD FOREIGN KEY ("A") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LevelToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
