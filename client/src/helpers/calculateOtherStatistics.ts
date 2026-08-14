import type { SavedAnswer } from "../types/SavedAnswer.ts";
import { getSofiaDateString } from "./getSofiaDateString.ts";

function getQuestionsAnswered(answers: SavedAnswer[]): number {
    return answers.length;
}

function getAccuracy(answers: SavedAnswer[]): number {
    if (answers.length === 0) return 0;
    const correct = answers.filter(answer => answer.isCorrect).length;
    return Math.round((correct / answers.length) * 100);
}

function getHighestStreak(answers: SavedAnswer[]): number {
    if (answers.length === 0) return 0;

    let highestStreak = 0;
    let currentStreak = 0;
    let currentDay: string | null = null;

    for (const answer of answers) {
        if (answer.answeredAt !== answer.date) {
            continue;
        }

        if (currentDay === null) {
            currentStreak = 1;
        }
        else {
            const previousDay = new Date(currentDay);
            previousDay.setDate(previousDay.getDate() + 1);

            const expectedDay = getSofiaDateString(previousDay);

            if (answer.date === expectedDay) {
                currentStreak++;
            }
            else if (answer.date !== currentDay) {
                currentStreak = 1;
            }
        }

        currentDay = answer.date;
        highestStreak = Math.max(highestStreak, currentStreak);
    }

    return highestStreak;
}

export function calculateOtherStats(answers: SavedAnswer[]) {
    return {
        questionsAnswered: getQuestionsAnswered(answers),
        accuracy: getAccuracy(answers),
        highestStreak: getHighestStreak(answers)
    }
}