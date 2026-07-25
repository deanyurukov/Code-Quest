import express from "express";
import { getQuestion } from "../services/question-service.js";
import Question from "../models/question.js";
import { getSofiaDateString } from "../services/date-service.js";
import getDayNumber from "../helpers/dayNumber.js";
import formatResponse from "../helpers/responseFormatter.js";

const router = express.Router();

router.get("/question/get", async (req, res) => {
    const question = await getQuestion();

    if (!question) {
        return res.status(404).json({ error: "No question found for today" });
    }

    const response = question.toObject();
    const formatted = await formatResponse(response);

    res.json(formatted);
});

router.get("/question/:date", async (req, res) => {
    const day = new Date(req.params.date);
    const question = await getQuestion(day);

    if (!question) {
        return res.status(404).json({ error: `No question found for day ${day}` });
    }

    const response = question.toObject();
    const formatted = await formatResponse(response);

    res.json(formatted);
});

export default router;