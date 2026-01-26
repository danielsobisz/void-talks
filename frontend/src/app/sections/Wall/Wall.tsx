import { Post } from "@/components/Post/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";

import styles from "./Wall.module.scss";

type PostType = {
  id: string;
  content: string;
  createdAt: string;
};

export const Wall: FC = () => {
  const { data } = useQuery({
    queryKey: ["CONFESSIONS"],
    queryFn: async () => {
      const res = await axios.get<PostType[]>(
        "http://localhost:8080/confessions",
      );

      return res;
    },
  });

  return (
    <div className={styles.wallOuter}>
      <div className={styles.wall}>
        {data?.data.map((item) => (
          <Post key={item.id}>{item.content}</Post>
        ))}
      </div>
    </div>
  );
};
