"use client";
import styles from "./page.module.css";

import { Wall } from "./sections/Wall/Wall";
import { CreateNewPost } from "../components/CreateNewPost/CreateNewPost";

export default function Home() {
  return (
    <div className={styles.page}>
      <CreateNewPost />

      <Wall />
    </div>
  );
}
