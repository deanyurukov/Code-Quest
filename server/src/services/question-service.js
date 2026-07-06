import Question from "../models/question.js";
import { getSofiaDateString } from "./date-service.js";

export async function getQuestion() {
    const today = getSofiaDateString();
    const question = await Question.findOne({ date: today });

    return question;
}