import { prisma } from "src/config/prismaClient";

class RecoveryRepository {
  async confirmRecoveryKeyReceived(id: string, tokenId: string) {
    return prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: { isRecoverySetupDone: true },
      }),
      prisma.temporaryDisplayToken.delete({ where: { id: tokenId } }),
    ]);
  }

  async findByToken(token: string) {
    return await prisma.temporaryDisplayToken.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async findTokenByUserId(userId: string) {
    return await prisma.temporaryDisplayToken.findUnique({
      where: { userId },
    });
  }

  async deleteToken(id: string) {
    return await prisma.temporaryDisplayToken.delete({ where: { id } });
  }
}

export const recoveryRepository = new RecoveryRepository();
