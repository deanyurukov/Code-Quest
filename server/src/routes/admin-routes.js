import express from "express";
import { getAIResponse } from "../services/ai-service.js";

const router = express.Router();

router.get("/admin/question/get", async (req, res) => {
    const response = await getAIResponse();
    res.json(response);
});

export default router;