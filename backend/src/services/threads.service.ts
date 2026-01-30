import {prisma} from "../config/prismaClient";

export const createConfessionThreadItem = async (
    id: string,
    content: string,
) => {
    return prisma.thread.create({data: {content, confessionId: id}})

};
