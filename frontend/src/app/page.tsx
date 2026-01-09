"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useState } from "react";
import { Wall } from "./sections/Wall/Wall";

export default function Home() {
  const [post, setPost] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const { mutateAsync } = useMutation({
    mutationKey: ["submit_post"],
    mutationFn: async () => {
      const res = await axios.post("http://localhost:8080/confessions", {
        content: post,
        captchaToken: token,
      });

      console.log(res);
    },
  });

  const handleVerificationSuccess = (token: any, eKey: any) => {
    setToken(token);
    console.log(token);
    console.log(eKey);
  };

  const submitPost = () => {
    mutateAsync();
  };

  return (
    <div className={styles.page}>
      <Wall />

      <HCaptcha
        sitekey={process.env.SITE_KEY!}
        onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
      />

      <input onChange={(e) => setPost(e.target.value)} value={post} />
      <button onClick={submitPost}>submit</button>
    </div>
  );
}
