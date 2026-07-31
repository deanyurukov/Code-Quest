import Question from "../models/question.js";

export async function getAllQuestions() {
    const questions = (await Question.find()).map(q => q.question);
    return questions;
}