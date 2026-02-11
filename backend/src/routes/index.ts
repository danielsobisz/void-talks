import { Router } from "express";
import confession from "./confession.routes";
import threads from "./threads.routes";
import auth from "./auth.routes";
import recovery from "./recovery.routes";

const router = Router();

router.use("/confessions", confession);
router.use("/threads", threads);
router.use("/auth", auth);
router.use("/recovery", recovery);

export default router;
