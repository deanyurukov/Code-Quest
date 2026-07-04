import cron from "node-cron";
import { getAIResponse } from "../services/ai-service.js";
import Question from "../models/question.js";

cron.schedule(
    "0 0 * * *",
    async () => {
        console.log("Generating tomorrow's question...");
        await getAIResponse();
    },
    {
        timezone: "Europe/Sofia",
    }
);