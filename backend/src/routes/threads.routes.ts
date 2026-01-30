import express, {Router} from "express";
import {postConfessionThreadItem} from "../controllers/threads.controller";

const router: Router = express.Router();

router.post("/:id", postConfessionThreadItem);

export default router;