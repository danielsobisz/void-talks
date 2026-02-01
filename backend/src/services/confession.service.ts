import {prisma} from "../config/prismaClient";
import {decrypt, encrypt} from "../crypto/encryption";

export const createConfession = async (content: string) => {
    const encrypted = encrypt(content);

    return prisma.confession.create({
        data: {
            content: encrypted.ciphertext,
            iv: encrypted.iv,
            authTag: encrypted.authTag
        },
    });
};

export async function getAllConfessions() {
    const rows = await prisma.confession.findMany({
        orderBy: {createdAt: "desc"},
    });

    return rows.map(row => {
        try {
            return {
                id: row.id,
                content: decrypt({
                    ciphertext: row.content,
                    iv: row.iv,
                    authTag: row.authTag,
                }),
                createdAt: row.createdAt,
            };
        } catch {
            return {
                id: row.id,
                content: "[content unavailable]",
                createdAt: row.createdAt,
            };
        }
    });
}
