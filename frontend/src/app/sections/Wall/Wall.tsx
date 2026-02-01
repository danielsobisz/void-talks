import {Post} from "@/components/Post/Post";
import {useQuery} from "@tanstack/react-query";
import {FC} from "react";

import styles from "./Wall.module.scss";
import {getAllConfessions} from "@/services/confessions.service";

type PostType = {
    id: string;
    content: string;
    createdAt: string;
};

export const Wall: FC = () => {
    const {data} = useQuery({
        queryKey: ["CONFESSIONS"],
        queryFn: async () => {
            return await getAllConfessions();
        },
    });

    return (
        <div className={styles.wallOuter}>
            <div className={styles.wall}>
                {data?.map((item) => (
                    <Post key={item.id}>{item.content}</Post>
                ))}
            </div>
        </div>
    );
};
