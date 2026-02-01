import { validateToken } from "src/middleware/auth.middleware";
import express, { Router } from "express";
import { confessionController } from "src/controllers/confession.controller";

const router: Router = express.Router();

router.get("/", confessionController.getAllConfessions);
router.post("/", validateToken, confessionController.createConfession);

export default router;
