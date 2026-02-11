import dayjs from "dayjs";
import { recoveryRepository } from "src/repository/recovery.repository";

type RecoveryPayload = {
  temporaryToken: string;
};

type RecoverySetupPayload = {
  userId: string;
};

class RecoveryService {
  async getRecoveryKey({ temporaryToken }: RecoveryPayload) {
    const tokenData = await recoveryRepository.findByToken(temporaryToken);

    if (!tokenData) {
      throw new Error("Token not found");
    }

    if (dayjs().isAfter(tokenData.expiresAt)) {
      await recoveryRepository.deleteToken(tokenData.id);
      throw new Error("Token is expired");
    }

    if (tokenData.user.isRecoverySetupDone) {
      await recoveryRepository.deleteToken(tokenData.id);
    }

    return {
      rawKey: tokenData.rawKey,
      userId: tokenData.userId,
      tokenId: tokenData.id,
    };
  }

  async confirmRecoverySetup({ userId }: RecoverySetupPayload) {
    const tokenData = await recoveryRepository.findTokenByUserId(userId);

    if (!tokenData) {
      throw new Error("Confirmation not possible");
    }

    await recoveryRepository.confirmRecoveryKeyReceived(userId, tokenData.id);

    return { success: true };
  }
}

export const recoveryService = new RecoveryService();
