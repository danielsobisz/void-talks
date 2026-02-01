import { Request, Response } from "express";
import { threadService } from "src/services/threads.service";

class ThreadController {
  async createThreadItemInConfession(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { content } = req.body;
    const confessionId = req.params.id;

    try {
      const thread = await threadService.createConfessionThreadItem({
        confessionId,
        content,
      });
      return res.status(201).json(thread);
    } catch {
      console.error("err");
    }

    if (!content.trim() || typeof content !== "string") {
      return res.status(400).json({ error: "Content is required" });
    }
  }
}

export const threadController = new ThreadController();
