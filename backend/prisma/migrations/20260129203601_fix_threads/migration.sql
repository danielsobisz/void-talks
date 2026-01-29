/*
  Warnings:

  - You are about to drop the `Thread` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_confessionId_fkey";

-- DropTable
DROP TABLE "Thread";

-- CreateTable
CREATE TABLE "thread" (
    "id" TEXT NOT NULL,
    "confessionId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "thread_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "thread" ADD CONSTRAINT "thread_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "confession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
