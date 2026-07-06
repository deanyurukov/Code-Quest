import express from "express";
import { getQuestion } from "../services/question-service.js";
import { LAUNCH_DATE } from "../server.js";

const router = express.Router();

router.get("/question/get", async (req, res) => {
    const response = (await getQuestion()).toObject();
    const dayNumber = Math.floor((new Date(response.date) - LAUNCH_DATE) / (1000 * 60 * 60 * 24)) + 1;
    response.dayNumber = dayNumber;
    res.json(response);
});

export default router;