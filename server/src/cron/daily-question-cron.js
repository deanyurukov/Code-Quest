import cron from "node-cron";
import { getAIResponse } from "../services/ai-service.js";
import Question from "../models/question.js";

cron.schedule(
    "0 0 * * *",
    async () => {
        console.log("Generating today's question...");
        await getAIResponse();
        console.log("Today's question was generated and saved to the database.");
    }
);