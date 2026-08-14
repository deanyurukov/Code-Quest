import type { SavedAnswer } from "../types/SavedAnswer.ts";

export function calculateDifficultyStats(answers: SavedAnswer[]) {
    const stats = {
        Beginner: {
            answered: 0,
            correct: 0,
            accuracy: 0
        },
        Intermediate: {
            answered: 0,
            correct: 0,
            accuracy: 0
        },
        Advanced: {
            answered: 0,
            correct: 0,
            accuracy: 0
        }
    };

    answers.forEach(answer => {
        const difficulty = answer.difficulty;

        stats[difficulty].answered++;

        if (answer.isCorrect) {
            stats[difficulty].correct++;
        }
    });

    Object.values(stats).forEach(stat => {
        stat.accuracy = stat.answered > 0
            ? (stat.correct / stat.answered) * 100
            : 0;
    });

    return stats;
}