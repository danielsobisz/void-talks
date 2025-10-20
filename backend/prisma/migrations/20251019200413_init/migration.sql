/*
  Warnings:

  - You are about to drop the `Confession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Confession";

-- CreateTable
CREATE TABLE "confession" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "confession_pkey" PRIMARY KEY ("id")
);
