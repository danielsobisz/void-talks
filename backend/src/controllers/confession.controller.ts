import { Request, Response } from "express";
import {
  createConfession,
  getAllConfessions,
} from "../services/confession.service";

export const postConfession = async (req: Request, res: Response) => {
  const { content } = req.body;

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Content is required" });
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
    console.log(all);
    return res.json(all);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
