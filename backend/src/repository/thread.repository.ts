import { prisma } from "src/config/prismaClient";
import { ThreadItemPayload } from "src/types/threads";

class ThreadRepository {
  createThreadItem({ confessionId, content }: ThreadItemPayload) {
    return prisma.thread.create({ data: { content, confessionId } });
  }
}

export const threadRepository = new ThreadRepository();
