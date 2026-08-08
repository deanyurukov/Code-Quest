import { getAllQuestions } from "../helpers/getAllQuestions.js";
import Question from "../models/question.js";
import { getSofiaDateString } from "./date-service.js";

const url = process.env.AI_URL;

export async function getAIResponse() {
    const alreadyExisting = await getAllQuestions();

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
                                text: `
                                    Generate one multiple-choice question about programming or computer science.

                                    The topic can vary widely and may cover programming languages, algorithms, data structures, databases, software engineering, web development, networking, operating systems, security, or general computer science concepts.

                                    Do not always generate data structures questions.

                                    The difficulty can be Beginner, Intermediate, or Advanced.

                                    Return ONLY a valid JSON object with exactly this structure:

                                    {
                                        "question": "string",
                                        "answers": ["string", "string", "string", "string"],
                                        "correctAnswerIndex": 0,
                                        "topic": "string",
                                        "difficulty": "Beginner | Intermediate | Advanced",
                                        "explanation": "string"
                                    }

                                    Rules:
                                    - Do NOT wrap the response in Markdown.
                                    - Do NOT include any text outside the JSON.
                                    - Do NOT include code snippets, HTML, Markdown, backticks, newline characters (\n), or escaped formatting.
                                    - The "question" must be a single plain-text sentence.
                                    - The "topic" must be a short plain-text string.
                                    - The "difficulty" must be exactly one of: "Beginner", "Intermediate", or "Advanced".
                                    - "correctAnswerIndex" must be an integer from 0 to 3.
                                    - The explanation must be 2–4 concise sentences.
                                    - The explanation must explain only why the correct answer is correct. Do not mention or compare the incorrect answers.
                                    - The explanation should teach the underlying concept rather than simply restating the answer.

                                    Do not generate a question that matches any of the existing questions below. Also, avoid having more than 3 questions in a row with the same difficulty.

                                    Existing questions: {alreadyExisting}.`
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
                correctAnswerIndex: obj.correctAnswerIndex,
                topic: obj.topic,
                difficulty: obj.difficulty,
                explanation: obj.explanation,
            });
        }
        catch (error) {
            throw new Error(error);
        }

        return obj;
    }
    catch (error) {
        console.error("Error:", error.message);
        throw new Error("Error fetching AI response");
    }
}