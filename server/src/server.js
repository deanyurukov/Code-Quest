import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import './config.js';
import { getQuestion } from "./services/question-service.js";
import mongoose from "mongoose";

import Question from "./models/question.js";
import { getAIResponse } from "./services/ai-service.js";

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://192.168.1.6:3000"];
const uri = process.env.URI_KEY;

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

app.get("/question/get", async (req, res) => {
    const response = await getQuestion();
    res.json(response);
});

app.get("/admin/question/get", async (req, res) => {
    const response = await getAIResponse();
    res.json(response);
});

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});