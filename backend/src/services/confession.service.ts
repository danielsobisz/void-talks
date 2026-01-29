import {PrismaClient} from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({adapter});

export const createConfession = async (content: string) => {
    return prisma.confession.create({
        data: {content},
    });
};
console.log('fields', prisma.confession);

export const getAllConfessions = async () => {
    return prisma.confession.findMany({include: {threads: true}});
};

export const createConfessionThreadItem = async (
    id: string,
    content: string,
) => {
    return prisma.thread.create({data: {content, confessionId: id}})

};
