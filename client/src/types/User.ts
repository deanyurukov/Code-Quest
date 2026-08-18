import type { SavedAnswer } from "./SavedAnswer.ts";

export type User = {
    _id: string;
    username: string;
    email: string;
    answers: SavedAnswer[];
    xp: number;
    isVerified: boolean;
    joinedOn: Date,
    createdAt: string;
    updatedAt: string;
};