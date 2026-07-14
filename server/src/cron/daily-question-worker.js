import { getAIResponse } from "../services/ai-service.js";

(async () => {
    try {
        console.log("Worker: generating today's question...");
        await getAIResponse();
        console.log("Worker: question generated successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Worker error:", err);
        process.exit(1);
    }
})();
