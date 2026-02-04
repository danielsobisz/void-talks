"use client";
import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { authService } from "@/services/auth.service";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async () => {
    await authService.register({ username, password });
  };

  return (
    <div className={styles["register-page"]}>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <input
        placeholder="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        disabled={!username || !password || password !== confirmPassword}
        onClick={() => register()}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
