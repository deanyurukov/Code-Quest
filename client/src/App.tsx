import { useEffect, useState } from "react";
import { get } from "./api/requester.ts";
import { endpoints } from "./api/endpoints.ts";
import Answer from "./components/Answer.js";
import Spinner from "./components/Spinner.js";
import type { Question } from "./types/Question.ts";
import type { SavedAnswer } from "./types/SavedAnswer.ts";
import Countdown from "./components/Countdown.tsx";
import { getSofiaDateString } from "./helpers/getSofiaDateString.ts";
import { calculateStreak } from "./helpers/calculateStreak.ts";
import QuestionExplanation from "./components/QuestionExplanation.tsx";

function App() {
    const [question, setQuestion] = useState<Question | null>(null);
    const letters: string[] = ["A", "B", "C", "D"];
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [streak, setStreak] = useState<number>(0);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);

    async function getQuestion(): Promise<void> {
        try {
            setLoading(true);
            const data = await get<Question>(endpoints.specific(getSofiaDateString()));
            setQuestion(data);

            preSetAnswers(data);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    async function getDiffQuestion(offset: number) {
        const wantedDay = new Date(question!.date);
        wantedDay.setDate(wantedDay.getDate() + offset);

        const formattedDate = wantedDay.toISOString().split("T")[0];

        try {
            setLoading(true);
            const newQuestion = await get<Question>(endpoints.specific(formattedDate));
            setQuestion(newQuestion);
            setLoading(false);

            preSetAnswers(newQuestion);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setLoading(false);
        }
    }

    function preSetAnswers(data: Question) {
        const questionAnswered: SavedAnswer | undefined = JSON.parse(localStorage.getItem("answers") ?? "[]").find((q: SavedAnswer) => q.date! === data.date);

        if (questionAnswered !== undefined) {
            setIsSubmitted(true);
            setSelectedAnswer(questionAnswered.selected);
            setCorrectAnswerIndex(questionAnswered.correctAnswerIndex);
        }
        else {
            setIsSubmitted(false);
            setSelectedAnswer(null);
            setCorrectAnswerIndex(null);
        }
    }

    async function handleSubmit(e: any): Promise<void> {
        e.preventDefault();
        if (selectedAnswer === null) return;

        const { isCorrect, correctAnswerIndex }: { isCorrect: boolean, correctAnswerIndex: number } = await get(endpoints.submitSpecific(question?.date!), { selectedAnswer });
        setCorrectAnswerIndex(correctAnswerIndex);

        setIsSubmitted(true);
        const saved: SavedAnswer[] = JSON.parse(localStorage.getItem("answers") ?? "[]");

        if (saved.find(q => q.date === question?.date) === undefined) {
            saved.push(
                {
                    date: question?.date!,
                    isCorrect: isCorrect,
                    selected: selectedAnswer!,
                    answeredAt: getSofiaDateString(),
                    correctAnswerIndex: correctAnswerIndex
                }
            );

            saved.sort((a, b) => a.date.localeCompare(b.date));
            localStorage.setItem("answers", JSON.stringify(saved));
            setStreak(calculateStreak(saved));
        }
    }

    useEffect(() => {
        void getQuestion();

        const saved: SavedAnswer[] = JSON.parse(localStorage.getItem("answers") ?? "[]");
        setStreak(calculateStreak(saved));
    }, []);

    return (
        <>
            <header>
                <section className="title">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Code Quest</p>
                </section>

                <section className="day">
                    <button disabled={question?.previousExists === false || loading} onClick={() => getDiffQuestion(-1)} >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                        </span>
                    </button>
                    <h2>Day {loading ? "..." : question?.dayNumber}</h2>
                    <button disabled={question?.nextExists === false || loading} onClick={() => getDiffQuestion(1)} >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                        </span>
                    </button>
                </section>

                <section className="streak">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>
                    <p>{streak}</p>
                </section>
            </header>

            <main>
                {
                    loading ? <Spinner /> :
                        <article className="question-card">
                            <section className="question-info">
                                <div>
                                    {question?.topic}
                                </div>
                                <div className={question?.difficulty}>
                                    <span>
                                        {question?.difficulty === "Beginner" && "🌱"}
                                        {question?.difficulty === "Intermediate" && "⚔️"}
                                        {question?.difficulty === "Advanced" && "💀"}
                                    </span>
                                    {question?.difficulty}
                                </div>
                            </section>

                            <h3>{question?.question}</h3>

                            <section className={isSubmitted ? "answers submitted-container" : "answers"}>
                                {
                                    question?.answers.map((answer, i) => (
                                        <Answer key={i} answer={answer} letter={letters[i]} selected={selectedAnswer} setSelected={setSelectedAnswer} index={i} correctIndex={correctAnswerIndex!} isSubmitted={isSubmitted} />
                                    ))
                                }
                            </section>

                            {
                                !isSubmitted ?
                                    <button disabled={selectedAnswer === null} onClick={handleSubmit}>Submit Answer</button> :
                                    <QuestionExplanation explanation={question?.explanation!} isCorrect={correctAnswerIndex === selectedAnswer} />
                            }
                        </article>
                }

                <Countdown />
            </main>
        </>
    );
}

export default App;