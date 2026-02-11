import crypto from "crypto";

export const generateRandomKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
