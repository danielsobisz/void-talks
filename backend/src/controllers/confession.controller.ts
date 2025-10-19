import { Request, Response } from "express";
import {
  createConfession,
  getAllConfessions,
} from "../services/confession.service";

export const postConfession = (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Content is required" });
  }

  const confession = createConfession(content);
  return res.status(201).json(confession);
};

export const listConfessions = (_req: Request, res: Response) => {
  const all = getAllConfessions();

  return res.json(all);
};
