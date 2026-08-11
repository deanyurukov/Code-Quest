import Question from "../models/question.js";
import { getSofiaDateString } from "./date-service.js";

export async function getQuestion(date = new Date()) {
    const dateToGet = getSofiaDateString(date);
    const question = await Question.findOne({ date: dateToGet });

    return question;
}

export async function getAllQuestions() {
    const questions = (await Question.find()).sort((a, b) => a.date.localeCompare(b.date)).map(q => {
        return { question: q.question, difficulty: q.difficulty };
    });
    return questions;
}