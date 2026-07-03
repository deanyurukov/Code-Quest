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
                                text: "Generate one multiple-choice programming question. Return ONLY a valid JSON object with exactly this structure: {'question':'string','answers':['string','string','string','string'],'correctAnswerIndex':0}. Do NOT wrap the response in Markdown, do NOT include explanations or any text outside the JSON, do NOT include code snippets, newline characters (\\n), HTML, Markdown, backticks, or escaped formatting. The 'question' must be a single plain-text sentence, all values must be plain strings, and 'correctAnswerIndex' must be an integer from 0 to 3."
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

        return obj;
    } catch (error) {
        throw new Error(error.message);
    }
}