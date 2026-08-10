import type { Difficulty } from "./Difficulty.ts";

export type Question = {
    id: string;
    date: string,
    question: string,
    answers: string[],
    topic: string,
    difficulty: Difficulty,
    explanation: string,
    dayNumber: number,
    previousExists: boolean,
    nextExists: boolean
}