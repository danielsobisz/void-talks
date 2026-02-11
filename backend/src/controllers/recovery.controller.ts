import { Request, Response } from "express";
import { recoveryService } from "src/services/recovery.service";

class RecoveryController {
  async getRecoveryKey(req: Request, res: Response): Promise<Response> {
    const temporaryToken = req.params.id;

    try {
      const data = await recoveryService.getRecoveryKey({ temporaryToken });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: error.message });
    }
  }

  async confirmRecoveryKeySetup(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const { userId } = req.body;

    try {
      const data = await recoveryService.confirmRecoverySetup({ userId });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const recoveryController = new RecoveryController();
