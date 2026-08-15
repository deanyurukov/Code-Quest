import express from "express";
import mongoose from "mongoose";
import { getAIResponse } from "../services/ai-service.js";

const router = express.Router();

router.get("/admin/question/get", async (req, res) => {
    try {
        if (req.headers["x-cron-secret"] !== process.env.CRON_SECRET) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        let lastError;

        for (let attempt = 1; attempt <= 4; attempt++) {
            try {
                await getAIResponse();
                return res.sendStatus(204);
            }
            catch (e) {
                lastError = e;

                console.error(`AI request failed (attempt ${attempt}/4):`, e);

                if (attempt < 4) {
                    await new Promise(resolve => setTimeout(resolve, attempt * 5000));
                }
            }
        }

        throw lastError;
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.get("/admin/health", async (req, res) => {
    if (req.headers["x-cron-secret"] !== process.env.CRON_SECRET) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    res.sendStatus(204);
});

export default router;