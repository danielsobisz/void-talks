"use client";
import {FC, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import styles from "./CreateNewPost.module.scss";
import {Modal} from "../Modal/Modal";
import {requireValue} from "@/utils/require";
import {createConfession} from "@/services/confessions.service";

export const CreateNewPost: FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [post, setPost] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const queryClient = useQueryClient();

    const {mutateAsync} = useMutation({
        mutationKey: ["submit_post"],
        mutationFn: async () => {
            await createConfession(post, token);

            setIsOpen(false);
            setPost("");

            await queryClient.invalidateQueries({queryKey: ["CONFESSIONS"]});
        },
    });

    const handleVerificationSuccess = (token: string) => {
        setToken(token);
    };

    const submitPost = async () => {
        await mutateAsync();
    };

    return (
        <>
            <button
                className={styles["create-new-post-btn"]}
                onClick={() => setIsOpen(true)}
            >
                What&apos;s on your mind?...
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <textarea
            className={styles["create-new-post-input"]}
            onChange={(e) => setPost(e.target.value)}
            value={post}
            placeholder="What's on your mind?..."
        />

                <HCaptcha
                    sitekey={requireValue<string>(process.env.NEXT_PUBLIC_SITE_KEY)}
                    onVerify={(token) => handleVerificationSuccess(token)}
                />

                <button
                    className={styles["create-new-post-submit"]}
                    onClick={submitPost}
                    disabled={!post.trim()}
                >
                    Send
                </button>
            </Modal>
        </>
    );
};
