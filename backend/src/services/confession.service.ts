import { Confession } from "../types/confession";
import { randomUUID } from "crypto";

const confessions: Confession[] = [];

export const createConfession = (content: string): Confession => {
  const newConfession: Confession = {
    id: randomUUID(),
    content,
    createdAt: new Date(),
  };

  confessions.push(newConfession);
  return newConfession;
};

export const getAllConfessions = (): Confession[] => confessions;
