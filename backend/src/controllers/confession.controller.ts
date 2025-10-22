import { Request, Response } from "express";
import {
  createConfession,
  getAllConfessions,
} from "../services/confession.service";
import { verifyCaptcha } from "../utils/verifyCaptcha";

export const postConfession = async (req: Request, res: Response) => {
  const { content, captchaToken } = req.body;

  if (!content?.trim() || typeof content !== "string") {
    return res.status(400).json({ error: "Content is required" });
  }

  const validCaptcha = await verifyCaptcha(captchaToken);

  if (!validCaptcha) {
    return res.status(403).json({ error: "Wrong captcha" });
  }

  try {
    const confesison = await createConfession(content);
    return res.status(201).json(confesison);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const listConfessions = async (_req: Request, res: Response) => {
  try {
    const all = await getAllConfessions();
    return res.json(all);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
