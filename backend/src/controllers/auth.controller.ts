import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { readFileSync } from "fs";
import { join } from "path";
import jwt from "jsonwebtoken";
import { authService } from "src/services/auth.service";
import { authRepository } from "src/repository/auth.repository";
import { generateRefreshToken } from "src/crypto/generateRefreshToken";

const PRIVATE_KEY = readFileSync(
  join(process.cwd(), "keys/jwt-private.pem"),
  "utf8",
);

class AuthController {
  async registerUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    if (
      await authRepository.isUserExistByUsername(username.toLocaleLowerCase())
    ) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const user = await authService.createUser({ username, password });

    return res.status(201).json(user);
  }

  async loginUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;

    const isUserExist = await authRepository.isUserExistByUsername(
      username.toLocaleLowerCase(),
    );

    if (!isUserExist) {
      return res.status(400).json({ error: "Authentication failed" });
    }

    const user = await authRepository.getUserByUsername(
      username.toLocaleLowerCase(),
    );

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Authentication failed2" });
    }

    const accessToken = jwt.sign({ username }, PRIVATE_KEY, {
      expiresIn: "1h",
      algorithm: "RS256",
    });

    const refreshToken = generateRefreshToken();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/auth/refresh",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successfull" });
  }
}

export const authController = new AuthController();
