-- CreateTable
CREATE TABLE "JigsawPuzzleLevel" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,
    "rows" INTEGER NOT NULL,
    "cols" INTEGER NOT NULL,

    CONSTRAINT "JigsawPuzzleLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JigsawPuzzleLevelCompletions" (
    "userId" TEXT NOT NULL,
    "jigsawPuzzleLevelId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tookMs" INTEGER NOT NULL,

    CONSTRAINT "JigsawPuzzleLevelCompletions_pkey" PRIMARY KEY ("userId","jigsawPuzzleLevelId")
);

-- CreateIndex
CREATE UNIQUE INDEX "JigsawPuzzleLevel_number_key" ON "JigsawPuzzleLevel"("number");

-- AddForeignKey
ALTER TABLE "JigsawPuzzleLevelCompletions" ADD CONSTRAINT "JigsawPuzzleLevelCompletions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JigsawPuzzleLevelCompletions" ADD CONSTRAINT "JigsawPuzzleLevelCompletions_jigsawPuzzleLevelId_fkey" FOREIGN KEY ("jigsawPuzzleLevelId") REFERENCES "JigsawPuzzleLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
