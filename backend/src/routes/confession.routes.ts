import express from "express";
import {
  listConfessions,
  postConfession,
} from "../controllers/confession.controller";

const router = express.Router();

router.get("/", listConfessions);
router.post("/", postConfession);

export default router;
