import express from "express";
import { getQuestion } from "../services/question-service.js";
import { getSofiaDateString } from "../services/date-service.js";
import getDayNumber from "../helpers/dayNumber.js";
import formatResponse from "../helpers/responseFormatter.js";

const router = express.Router();

router.get("/question/:date", async (req, res) => {
    const day = new Date(req.params.date);
    const question = await getQuestion(day);

    if (!question) {
        return res.status(404).json({ error: `No question found for day ${day}` });
    }

    const response = question.toObject();
    delete response.correctAnswerIndex;
    const formatted = await formatResponse(response);

    res.json(formatted);
});

router.get("/question/submission/:date", async (req, res) => {
    const day = new Date(req.params.date);
    const question = await getQuestion(day);
    const selected = Number(req.query.selectedAnswer);

    if (!question) {
        return res.status(404).json({ error: `No question found for day ${day}` });
    }

    question.submissions++;
    await question.save();
    res.status(200).json({ correctAnswerIndex: question.correctAnswerIndex, isCorrect: question.correctAnswerIndex === selected });
});

export default router;