import { ThreadItemPayload } from "src/types/threads";
import { threadRepository } from "src/repository/thread.repository";

class ThreadService {
  async createConfessionThreadItem({
    confessionId,
    content,
  }: ThreadItemPayload) {
    return threadRepository.createThreadItem({ confessionId, content });
  }
}

export const threadService = new ThreadService();
