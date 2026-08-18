const baseUrl = import.meta.env.VITE_LOCAL_SERVER_PATH || import.meta.env.VITE_DEPLOYED_SERVER_PATH;

export const endpoints = {
    specific: (day: string) => `${baseUrl}/question/${day}`,
    submitSpecific: (day: string) => `${baseUrl}/question/submission/${day}`,
    user: `${baseUrl}/user`,
    anonymous: `${baseUrl}/user/anonymous`,
    submitAnswer: `${baseUrl}/user/submission`,
    register: `${baseUrl}/user/register`
};