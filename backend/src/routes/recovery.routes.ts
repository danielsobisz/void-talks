import express, { Router } from "express";
import { authController } from "src/controllers/auth.controller";
import { recoveryController } from "src/controllers/recovery.controller";

const router: Router = express.Router();

router.get("/:id", recoveryController.getRecoveryKey);
router.post("/confirm", recoveryController.confirmRecoveryKeySetup);

export default router;
