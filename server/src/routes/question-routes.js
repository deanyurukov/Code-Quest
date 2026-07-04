import express from "express";
import { getQuestion } from "../services/question-service.js";

const router = express.Router();

router.get("/question/get", async (req, res) => {
    const response = await getQuestion();
    res.json(response);
});

export default router;