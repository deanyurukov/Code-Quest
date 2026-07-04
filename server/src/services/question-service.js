import Question from "../models/question.js";
import { getQuestionDateString } from "./ai-service.js";

export async function getQuestion() {
    const today = getQuestionDateString(new Date(), "Europe/Sofia");
    const question = await Question.findOne({ date: today });

    return question;
}