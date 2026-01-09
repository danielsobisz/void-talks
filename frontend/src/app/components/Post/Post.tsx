"use client";
import { FC, ReactNode } from "react";

import styles from "./Post.module.scss";

type PostProps = {
  children: ReactNode;
};

export const Post: FC<PostProps> = ({ children }) => {
  return (
    <div className={styles.post}>
      <p>{children}</p>
    </div>
  );
};
