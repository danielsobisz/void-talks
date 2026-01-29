-- CreateTable
CREATE TABLE "Thread" (
    "id" TEXT NOT NULL,
    "confessionId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Thread_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_confessionId_fkey" FOREIGN KEY ("confessionId") REFERENCES "confession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
