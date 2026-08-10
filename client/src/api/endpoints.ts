const baseUrl = "http://localhost:5001";
// const baseUrl = "https://code-quest-c118.onrender.com";

export const endpoints = {
    specific: (day: string) => `${baseUrl}/question/${day}`,
    submitSpecific: (day: string) => `${baseUrl}/question/submission/${day}`,
};