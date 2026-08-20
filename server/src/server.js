import express from "express";
import './config.js';
import mongoose from "mongoose";
import questionRoutes from "./routes/question-routes.js";
import userRoutes from "./routes/user-routes.js";
import adminRoutes from "./routes/admin-routes.js";
import rankRoutes from "./routes/rank-routes.js";

const app = express();
const allowedOrigins = ["https://code-quest-daily.vercel.app", "http://localhost:3000", "http://192.168.1.6:3000"];
const uri = process.env.LOCAL_DB_URI_KEY || process.env.DEPLOYED_DB_URI_KEY;

try {
    await mongoose.connect(uri);
    console.log('Connected to DB Successfully');
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5001;
export const LAUNCH_DATE = new Date("2026-07-06");

app.use((req, res, next) => {
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin); // Dynamic Origin
        res.setHeader('Access-Control-Allow-Credentials', 'true'); // If sending cookies or auth headers
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Authorization');

    next();
});

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        console.log(
            `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`
        );
    });

    next();
});

app.use(questionRoutes);
app.use(adminRoutes);
app.use(userRoutes);
app.use(rankRoutes);

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}.`);
});