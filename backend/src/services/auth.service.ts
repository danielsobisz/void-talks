import bcrypt from "bcrypt";
import { generateRecoveryKey } from "src/crypto/generateRecoveryKey";
import { authRepository } from "src/repository/auth.repository";

type CreateUserPayload = {
  username: string;
  password: string;
};

class AuthService {
  async createUser({ username, password }: CreateUserPayload) {
    const passwordHash = bcrypt.hash(password, 10);
    const usernameNorm = username.toLocaleLowerCase();
    const recoveryKey = generateRecoveryKey();
    const recoveryHash = bcrypt.hash(recoveryKey, 10);

    const data = await authRepository.createUser({
      username,
      usernameNorm,
      recoveryHash: await passwordHash,
      passwordHash: await recoveryHash,
    });

    return {
      id: data.id,
      username: data.username,
      recoveryKey: recoveryKey,
    };
  }

  async getAllUsers() {
    return authRepository.getAllUsers();
  }
}

export const authService = new AuthService();
