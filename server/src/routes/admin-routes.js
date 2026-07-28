import express from "express";
import mongoose from "mongoose";
import { getAIResponse } from "../services/ai-service.js";

const router = express.Router();

router.get("/admin/question/get", async (req, res) => {
    const response = await getAIResponse();
    res.json(response);
});

router.get("/admin/health", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();

        res.status(200).json({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch {
        res.status(500).json({
            status: "error",
            database: "disconnected",
            timestamp: new Date().toISOString(),
        });
    }
});

export default router;