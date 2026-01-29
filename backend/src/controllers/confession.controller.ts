import {Request, Response} from "express";
import {createConfession, createConfessionThreadItem, getAllConfessions} from "../services/confession.service";
import {verifyCaptcha} from "../utils/verifyCaptcha";

export const postConfession = async (req: Request, res: Response) => {
    const {content} = req.body;
    const captchaToken = req.headers["hcaptcha-token"] as string;
    console.log(req.headers);

    if (!content?.trim() || typeof content !== "string") {
        return res.status(400).json({error: "Content is required"});
    }

    const validCaptcha = await verifyCaptcha(captchaToken);

    if (!validCaptcha) {
        return res.status(403).json({error: "Wrong captcha"});
    }

    try {
        const confession = await createConfession(content);
        return res.status(201).json(confession);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Something went wrong"});
    }
};

export const listConfessions = async (_req: Request, res: Response) => {
    try {
        const all = await getAllConfessions();
        return res.json(all);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Something went wrong"});
    }
};

export const postConfessionThread = async (req: Request, res: Response) => {
    // console.log('its here', req);
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
