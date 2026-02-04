"use client";
import { authService } from "@/services/auth.service";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const login = async () => {
    await authService.login({ username: name, password: pass });
  };
  return (
    <div>
      {/* <LoginForm /> */}

      <input
        placeholder="Login"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={() => login()}>login</button>

      <Link href={"/register"}>Dont have an account? Register here</Link>
    </div>
  );
};

export default LoginPage;
