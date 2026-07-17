import '../config.js';
import mongoose from "mongoose";
import { getAIResponse } from "../services/ai-service.js";

const uri = process.env.URI_KEY;

// Force exit after 30 seconds to prevent hanging
const timeout = setTimeout(() => {
    console.error("Worker timeout: Forcing exit after 30 seconds");
    process.exit(1);
}, 30000);

(async () => {
    try {
        console.log("Worker: connecting to database...");
        await mongoose.connect(uri);
        console.log("Worker: connected to database.");

        console.log("Worker: generating today's question...");
        await getAIResponse();
        console.log("Worker: question generated successfully.");

        await mongoose.disconnect();
        clearTimeout(timeout);
        process.exit(0);
    } catch (err) {
        console.error("Worker error:", err.message || err);
        clearTimeout(timeout);
        process.exit(1);
    }
})();
