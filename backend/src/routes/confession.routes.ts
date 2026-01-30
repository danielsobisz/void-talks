import {listConfessions, postConfession} from "../controllers/confession.controller";
import express, {Router} from "express";

const router: Router = express.Router();

router.get("/", listConfessions);
router.post("/", postConfession);


export default router;
