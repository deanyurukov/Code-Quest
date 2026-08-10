import Question from "../models/question.js";

export async function getAllQuestions() {
    const questions = (await Question.find()).sort((a, b) => a.date.localeCompare(b.date)).map(q => {
        return { question: q.question, difficulty: q.difficulty };
    });
    return questions;
}