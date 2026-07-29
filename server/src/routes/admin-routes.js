import express from "express";
import mongoose from "mongoose";
import { getAIResponse } from "../services/ai-service.js";

const router = express.Router();

router.get("/admin/question/get", async (req, res) => {
    try {
        await getAIResponse();
        res.sendStatus(204);
    } 
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.get("/admin/health", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.sendStatus(204);
    } 
    catch {
        res.sendStatus(500);
    }
});

export default router;