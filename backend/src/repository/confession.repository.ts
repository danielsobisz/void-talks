import { prisma } from "src/config/prismaClient";
import { EncryptedPayload } from "src/crypto/encryption";

class ConfessionRepository {
  createConfession({ ciphertext, iv, authTag }: EncryptedPayload) {
    return prisma.confession.create({
      data: {
        content: ciphertext,
        iv,
        authTag,
      },
    });
  }

  getAllConfessions() {
    return prisma.confession.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}

export const confessionRepository = new ConfessionRepository();
