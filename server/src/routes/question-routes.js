import express from "express";
import { getQuestion } from "../services/question-service.js";
import { LAUNCH_DATE } from "../server.js";
import Question from "../models/question.js";
import { getSofiaDateString } from "../services/date-service.js";

const router = express.Router();

router.get("/question/get", async (req, res) => {
    const question = await getQuestion();

    if (!question) {
        return res.status(404).json({ error: "No question found for today" });
    }

    const response = question.toObject();
    const dayNumber = Math.floor((new Date(response.date) - LAUNCH_DATE) / (1000 * 60 * 60 * 24)) + 1;
    
    const previous = new Date(response.date);
    previous.setDate(previous.getDate() - 1);
    const previousExists = (await Question.find({ date: getSofiaDateString(previous) })).length !== 0;
    
    const next = new Date(response.date);
    next.setDate(next.getDate() + 1);
    const nextExists = (await Question.find({ date: getSofiaDateString(next) })).length !== 0;
    
    response.dayNumber = dayNumber;
    response.previousExists = previousExists;
    response.nextExists = nextExists;

    res.json(response);
});

export default router;