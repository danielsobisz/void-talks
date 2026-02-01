import { validateToken } from "src/middleware/auth.middleware";
import {
  listConfessions,
  postConfession,
} from "../controllers/confession.controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", listConfessions);
router.post("/", validateToken, postConfession);

export default router;
