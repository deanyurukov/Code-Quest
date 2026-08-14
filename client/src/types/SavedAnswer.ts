export type SavedAnswer = {
    date: string;
    isCorrect: boolean;
    selected: number;
    answeredAt: string;
    correctAnswerIndex: number;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
}