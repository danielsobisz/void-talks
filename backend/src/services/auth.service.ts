import bcrypt from "bcrypt";
import dayjs from "dayjs";
import { generateRandomKey } from "src/crypto/generateRandomKey";
import { authRepository } from "src/repository/auth.repository";

type CreateUserPayload = {
  username: string;
  password: string;
};

class AuthService {
  async createUser({ username, password }: CreateUserPayload) {
    const usernameNorm = username.toLocaleLowerCase();
    const recoveryKey = generateRandomKey();

    const recoveryKeyHash = bcrypt.hash(recoveryKey, 10);
    const passwordHash = bcrypt.hash(password, 10);
    const recoveryExpiresAt = dayjs().add(15, "minutes").toISOString();
    const temporaryToken = generateRandomKey();

    const data = await authRepository.createUser({
      username,
      usernameNorm,
      recoveryKeyHash: await recoveryKeyHash,
      passwordHash: await passwordHash,
      rawKey: recoveryKey,
      expiresAt: recoveryExpiresAt,
      temporaryToken,
    });

    return {
      id: data.id,
      temporaryToken,
      username: data.username,
    };
  }

  async getAllUsers() {
    return authRepository.getAllUsers();
  }
}

export const authService = new AuthService();
