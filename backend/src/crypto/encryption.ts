import {Buffer} from "node:buffer";
import crypto from 'crypto';

export type EncryptedPayload = {
    ciphertext: string;
    iv: string;
    authTag: string;
}

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

const loadKey = (): Buffer => {
    const raw = process.env.ENCRYPTION_KEY;

    if (!raw) {
        throw new Error('ENCRYPTION_KEY is required');
    }

    if (!raw.startsWith('base64:')) {
        throw new Error('ENCRYPTION_KEY must be base64 encoded');
    }

    const key = Buffer.from(raw.replace("base64:", ""), 'base64');

    if (key.length !== 32) {
        throw new Error('ENCRYPTION_KEY must be at least 32 bytes (AES-256)');
    }

    return key;
}

const KEY = loadKey();

export const encrypt = (plaintext: string): EncryptedPayload => {
    const IV = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV)
    const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);

    const authTag = cipher.getAuthTag();


    return {
        ciphertext: encrypted.toString('base64'),
        iv: IV.toString('base64'),
        authTag: authTag.toString('base64'),
    }
}

export function decrypt(payload: EncryptedPayload): string {
    const decipher = crypto.createDecipheriv(
        ALGORITHM,
        KEY,
        Buffer.from(payload.iv, "base64")
    );

    decipher.setAuthTag(Buffer.from(payload.authTag, "base64"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(payload.ciphertext, "base64")),
        decipher.final(),
    ]);

    return decrypted.toString("utf8");
}
