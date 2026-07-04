import cron from "node-cron";
import { getAIResponse } from "../services/aiService.js";
import Question from "../models/question.js";

cron.schedule(
    "55 23 * * *",
    async () => {
        console.log("Generating tomorrow's question...");
        await getAIResponse();
    },
    {
        timezone: "Europe/Sofia",
    }
);