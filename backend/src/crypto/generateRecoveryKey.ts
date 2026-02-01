import crypto from "crypto";

export const generateRecoveryKey = () => {
  return crypto.randomBytes(32).toString("hex");
};
