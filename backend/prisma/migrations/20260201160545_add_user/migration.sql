-- AlterTable
ALTER TABLE "confession" ALTER COLUMN "authTag" SET DEFAULT '',
ALTER COLUMN "iv" SET DEFAULT '';

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "usernameNorm" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "recoveryHash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_usernameNorm_key" ON "User"("usernameNorm");

-- CreateIndex
CREATE UNIQUE INDEX "User_recoveryHash_key" ON "User"("recoveryHash");
