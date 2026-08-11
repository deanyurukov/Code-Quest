import Question from "../models/question.js";
import { getDayNumber, getSofiaDateString } from "../services/date-service.js";

export default async function formatResponse(res) {
    const dayNumber = getDayNumber(res.date);

    const previous = new Date(res.date);
    previous.setDate(previous.getDate() - 1);
    const previousExists = (await Question.find({ date: getSofiaDateString(previous) })).length !== 0;

    const next = new Date(res.date);
    next.setDate(next.getDate() + 1);
    const nextExists = (await Question.find({ date: getSofiaDateString(next) })).length !== 0;

    res.dayNumber = dayNumber;
    res.previousExists = previousExists;
    res.nextExists = nextExists;

    return res;
}