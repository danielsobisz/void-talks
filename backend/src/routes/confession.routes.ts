import express from "express";
import {listConfessions, postConfession, postConfessionThread,} from "../controllers/confession.controller";

const router = express.Router();

router.get("/", listConfessions);
router.post("/", postConfession);
router.post("/:id", postConfessionThread);

export default router;
