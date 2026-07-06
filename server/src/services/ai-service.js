import Question from "../models/question.js";
import { getSofiaDateString } from "./date-service.js";

const url = process.env.AI_URL;

export async function getAIResponse() {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: "Generate one multiple-choice question about programming or computer science. The topic can vary widely and may cover programming languages, algorithms, data structures, databases, software engineering, web development, networking, operating systems, security, or general computer science concepts. The difficulty can range from beginner to advanced. Return ONLY a valid JSON object with exactly this structure: {'question':'string','answers':['string','string','string','string'],'correctAnswerIndex':0}. Do NOT wrap the response in Markdown, do NOT include explanations or any text outside the JSON, do NOT include code snippets, newline characters (\\n), HTML, Markdown, backticks, or escaped formatting. The 'question' must be a single plain-text sentence, all values must be plain strings, and 'correctAnswerIndex' must be an integer from 0 to 3."
                            }
                        ]
                    }
                ]
            }),
        });

        if (!response.ok) {
            throw new Error("Error fetching AI response: " + response.statusText);
        }

        const data = await response.json();
        const apiResponseText = data.candidates[0].content.parts[0].text;
        const obj = JSON.parse(apiResponseText);

        try {
            await Question.create({
                date: getSofiaDateString(),
                question: obj.question,
                answers: obj.answers,
                correctAnswerIndex: obj.correctAnswerIndex
            });
        } catch (error) {
            throw new Error(error);
        }

        return obj;
    } catch (error) {
        console.error("Error:", error.message);
        throw new Error("Error fetching AI response");
    }
}