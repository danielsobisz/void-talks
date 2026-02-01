import express, { Router } from "express";
import { threadController } from "src/controllers/threads.controller";
import { validateToken } from "src/middleware/auth.middleware";

const router: Router = express.Router();

router.post(
  "/:id",
  validateToken,
  threadController.createThreadItemInConfession,
);

export default router;
