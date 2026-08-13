import type { SavedAnswer } from "./SavedAnswer.ts";

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    answers: SavedAnswer[];
    xp: number;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
};