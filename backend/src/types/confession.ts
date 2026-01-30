import {Thread} from "./threads";

export interface Confession {
    id: string;
    content: string;
    createdAt: Date;
    thread: Thread[];
}

