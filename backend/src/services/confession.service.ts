import { confessionRepository } from "src/repository/confession.repository";
import { prisma } from "../config/prismaClient";
import { decrypt, encrypt } from "../crypto/encryption";

export const createConfession = async (content: string) => {
  const encrypted = encrypt(content);

  return confessionRepository.createConfession(encrypted);
};

export async function getAllConfessions() {
  const confessions = await confessionRepository.getAllConfessions();

  return confessions.map((confession) => {
    try {
      return {
        id: confession.id,
        content: decrypt({
          ciphertext: confession.content,
          iv: confession.iv,
          authTag: confession.authTag,
        }),
        createdAt: confession.createdAt,
      };
    } catch {
      return {
        id: confession.id,
        content: "[content unavailable]",
        createdAt: confession.createdAt,
      };
    }
  });
}
