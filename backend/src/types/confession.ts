export interface Confession {
    id: string;
    content: string;
    createdAt: Date;
    thread: Thread[];
}

export interface Thread {
    id: string;
    content: string;
    createdAt: Date;
}