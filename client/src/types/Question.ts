export type Question = {
    id: string;
    date: string,
    question: string,
    answers: string[],
    topic: string,
    difficulty: string,
    correctAnswerIndex: number,
    explanation: string,
    dayNumber: number,
    previousExists: boolean,
    nextExists: boolean
}