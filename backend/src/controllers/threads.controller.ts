import {Request, Response} from "express";
import {createConfessionThreadItem} from "../services/threads.service";

export const postConfessionThreadItem = async (req: Request, res: Response): Promise<Response> => {
    const {content} = req.body;
    const id = req.params.id;

    try {
        const thread = await createConfessionThreadItem(id, content)
        return res.status(201).json(thread);
    } catch {
        console.error('err')
    }

    if (!content.trim() || typeof content !== "string") {
        return res.status(400).json({error: "Content is required"});
    }
};
