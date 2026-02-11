/*
  Warnings:

  - You are about to drop the column `hasRecoveryBeenReceived` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `recoveryHash` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[recoveryKeyHash]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_recoveryHash_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "hasRecoveryBeenReceived",
DROP COLUMN "recoveryHash",
ADD COLUMN     "isRecoverySetupDone" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recoveryKeyHash" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "user_recoveryKeyHash_key" ON "user"("recoveryKeyHash");

-- AddForeignKey
ALTER TABLE "temporaryDisplayToken" ADD CONSTRAINT "temporaryDisplayToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
