import { verify } from "hcaptcha";

export const verifyCaptcha = async (token: string) => {
  const secret = process.env.HCAPTCHA_SECRET;

  const res = await verify(secret, token);

  return res.success;
};
