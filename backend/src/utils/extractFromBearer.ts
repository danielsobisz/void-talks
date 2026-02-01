import { Request } from "express";

export const extractFromBearer = (req: Request) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new Error("Auth header not provided");
  }
  const token = authHeader && authHeader.split(" ")[1];

  return token;
};
