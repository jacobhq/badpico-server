import { customAlphabet } from "nanoid";

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const nanoid = customAlphabet(alphabet, 16);
const nanoidSk = customAlphabet(alphabet, 24);

export function generateAttackId() {
    return `attack_${nanoid()}`;
}

export function generateBoardId() {
    return `board_${nanoid()}`;
}

export function generateEventId() {
    return `event_${nanoid()}`;
}

export function generateApiKey() {
    return `sk_api_${nanoidSk()}`;
}
