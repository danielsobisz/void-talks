import express, { Router } from "express";
import { loginUser, registerUser } from "src/controllers/auth.controller";

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
