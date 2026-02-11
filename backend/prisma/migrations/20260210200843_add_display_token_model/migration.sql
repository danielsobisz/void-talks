/*
  Warnings:

  - You are about to drop the column `recoveryId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `recoveryIdTTL` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_recoveryId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "recoveryId",
DROP COLUMN "recoveryIdTTL";

-- CreateTable
CREATE TABLE "temporaryDisplayToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "rawKey" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temporaryDisplayToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "temporaryDisplayToken_userId_key" ON "temporaryDisplayToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "temporaryDisplayToken_token_key" ON "temporaryDisplayToken"("token");
