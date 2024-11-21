/*
  Warnings:

  - You are about to drop the column `name` on the `Game` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('game-over', 'game-over-draw', 'in-progress', 'idle');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "name",
ADD COLUMN     "gameOverAt" TEXT,
ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'in-progress',
ADD COLUMN     "winnerId" TEXT;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_games" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_games_AB_unique" ON "_games"("A", "B");

-- CreateIndex
CREATE INDEX "_games_B_index" ON "_games"("B");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_games" ADD CONSTRAINT "_games_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_games" ADD CONSTRAINT "_games_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
