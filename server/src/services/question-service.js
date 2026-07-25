import Question from "../models/question.js";
import { getSofiaDateString } from "./date-service.js";

export async function getQuestion(date = new Date()) {
    const dateToGet = getSofiaDateString(date);
    const question = await Question.findOne({ date: dateToGet });

    return question;
}