import { prisma } from "src/config/prismaClient";

type CreateUserPayload = {
  username: string;
  usernameNorm: string;
  passwordHash: string;
  recoveryKeyHash: string;
  temporaryToken?: string;
  rawKey: string;
  expiresAt: string;
};

class AuthRepository {
  async createUser({
    username,
    usernameNorm,
    passwordHash,
    recoveryKeyHash,
    temporaryToken,
    rawKey,
    expiresAt,
  }: CreateUserPayload) {
    return prisma.user.create({
      data: {
        username,
        usernameNorm,
        passwordHash,
        recoveryKeyHash,
        temporaryToken: {
          create: {
            token: temporaryToken,
            rawKey,
            expiresAt,
          },
        },
      },
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async isUserExistByUsername(username: string): Promise<boolean> {
    return prisma.user
      .count({ where: { usernameNorm: username } })
      .then((c) => c > 0);
  }

  async getUserByUsername(username: string) {
    return prisma.user.findFirstOrThrow({ where: { usernameNorm: username } });
  }
}

export const authRepository = new AuthRepository();
