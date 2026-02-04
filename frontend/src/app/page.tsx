"use client";
import { Wall } from "@/Wall/Wall";
import styles from "./page.module.css";
import { Map } from "@/components/Map";

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <Map/> */}
      <Wall />
    </div>
  );
}
