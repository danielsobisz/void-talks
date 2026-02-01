import { Request, Response } from "express";
import { verifyCaptcha } from "../utils/verifyCaptcha";
import { confessionService } from "src/services/confession.service";

class ConfessionController {
  async createConfession(req: Request, res: Response): Promise<Response> {
    const { content } = req.body;
    const captchaToken = req.headers["hcaptcha-token"] as string;

    if (!content?.trim() || typeof content !== "string") {
      return res.status(400).json({ error: "Content is required" });
    }

    const validCaptcha = await verifyCaptcha(captchaToken);

    if (!validCaptcha) {
      return res.status(403).json({ error: "Wrong captcha" });
    }

    try {
      const confession = await confessionService.createConfession(content);
      return res.status(201).json(confession);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getAllConfessions(_req: Request, res: Response): Promise<Response> {
    try {
      const all = await confessionService.getAllConfessions();
      return res.json(all);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

export const confessionController = new ConfessionController();
