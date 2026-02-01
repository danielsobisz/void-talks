import { Request, Response } from "express";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { join } from "path";
import { extractFromBearer } from "src/utils/extractFromBearer";

const PUBLIC_KEY = readFileSync(
  join(process.cwd(), "keys/jwt-public.pem"),
  "utf8",
);

export const validateToken = (req: Request, res: Response, next: () => {}) => {
  const token = extractFromBearer(req);

  if (!token) return res.status(401).json({ error: "Token not provided" });

  jwt.verify(token, PUBLIC_KEY, (err) => {
    if (err) return res.status(401).json({ error: "Token is invalid" });
    next();
  });
};
