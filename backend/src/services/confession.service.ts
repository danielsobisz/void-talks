import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createConfession = async (content: string) => {
  const confession = await prisma.confession.create({
    data: { content },
  });

  return confession;
};

export const getAllConfessions = async () => {
  return prisma.confession.findMany();
};
