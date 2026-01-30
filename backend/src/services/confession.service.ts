import {prisma} from "../config/prismaClient";

export const createConfession = async (content: string) => {
    return prisma.confession.create({
        data: {content},
    });
};

export const getAllConfessions = async () => {
    return prisma.confession.findMany({include: {threads: true}});
};

