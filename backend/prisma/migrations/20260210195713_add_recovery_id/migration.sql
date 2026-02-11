/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "usernameNorm" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "recoveryHash" TEXT NOT NULL,
    "recoveryId" TEXT NOT NULL,
    "hasRecoveryBeenReceived" BOOLEAN NOT NULL DEFAULT false,
    "recoveryIdTTL" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_usernameNorm_key" ON "user"("usernameNorm");

-- CreateIndex
CREATE UNIQUE INDEX "user_recoveryHash_key" ON "user"("recoveryHash");

-- CreateIndex
CREATE UNIQUE INDEX "user_recoveryId_key" ON "user"("recoveryId");
