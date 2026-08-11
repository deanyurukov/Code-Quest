export function sortUserAnswers(answers) {
    return answers.sort((a, b) => a.date.localeCompare(b.date));
}