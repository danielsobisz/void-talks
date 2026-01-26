import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

export const createConfession = async (content: string) => {
  const confession = await prisma.confession.create({
    data: { content },
  });

  return confession;
};

export const getAllConfessions = async () => {
  return prisma.confession.findMany();
};
