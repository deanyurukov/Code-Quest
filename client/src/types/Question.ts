export type Question = {
    id: string;
    date: string,
    question: string,
    answers: string[],
    topic: string,
    difficulty: "Beginner" | "Intermediate" | "Advanced",
    explanation: string,
    dayNumber: number,
    previousExists: boolean,
    nextExists: boolean
}