import type { SavedAnswer } from "../types/SavedAnswer.ts";
import { getSofiaDateString } from "./getSofiaDateString.ts";

export function calculateStreak(questions: SavedAnswer[]): number {
    let streak = 0;

    let currentDay = getSofiaDateString();
    let i = questions.length - 1;
    const latest = questions.at(-1);

    if (
        !latest ||
        latest.date !== currentDay ||
        latest.answeredAt !== currentDay
    ) {
        const yesterday = new Date(currentDay);
        yesterday.setDate(yesterday.getDate() - 1);
        currentDay = getSofiaDateString(yesterday);
    }

    while (i >= 0) {
        const question = questions[i];

        if (question.date > currentDay) {
            i--;
            continue;
        }

        if (question.date < currentDay || question.answeredAt !== currentDay) {
            break;
        }

        streak++;

        const previousDay = new Date(currentDay);
        previousDay.setDate(previousDay.getDate() - 1);
        currentDay = getSofiaDateString(previousDay);

        i--;
    }

    return streak;
}