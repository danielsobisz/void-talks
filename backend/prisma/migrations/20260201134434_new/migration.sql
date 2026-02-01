/*
  Warnings:

  - Added the required column `authTag` to the `confession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iv` to the `confession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "confession" ADD COLUMN     "authTag" TEXT NOT NULL,
ADD COLUMN     "iv" TEXT NOT NULL;
