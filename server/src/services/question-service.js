import Question from "../models/question.js";

export async function getQuestion() {
    const today = new Date().toISOString().split("T")[0];
    const question = await Question.findOne({ date: today });

    return question;
}