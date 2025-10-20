import { PrismaClient } from "../generated/prisma/client";

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

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Connected to DB");
  } catch (e) {
    console.error("Cannot connect to DB", e);
  }
}

testConnection();
