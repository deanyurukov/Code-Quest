import { useEffect, useState } from 'react';

import { endpoints } from '../api/endpoints.ts';
import { get, put } from '../api/requester.ts';

import type { SavedAnswer } from '../types/SavedAnswer.ts';
import type { Question } from '../types/Question.ts';
import type { User } from '../types/User.ts';

import { calculateStreak } from '../helpers/calculateStreak.ts';
import { getSofiaDateString } from '../helpers/getSofiaDateString.ts';

import Countdown from '../components/Countdown.tsx';
import QuestionExplanation from '../components/QuestionExplanation.tsx';
import Answer from '../components/Answer.tsx';
import Spinner from '../components/Spinner.tsx';
import { useOutletContext } from 'react-router-dom';

const QuestionsPage = () => {
    const letters: string[] = ["A", "B", "C", "D"] as const;
    const xpLevels = { Beginner: 50, Intermediate: 100, Advanced: 150 } as const;

    const [question, setQuestion] = useState<Question | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number | null>(null);
    const [showXpGain, setShowXpGain] = useState<boolean>(false);
    const { user, setUser }: { user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> } = useOutletContext();

    async function getQuestionData() {
        try {
            setLoading(true);
            const questionData = await get<Question>(endpoints.specific(getSofiaDateString()));
            setQuestion(questionData);
        }
        catch (e) {
            console.error(e);
        }
    }

    async function getDiffQuestion(offset: number) {
        const wantedDay = new Date(question!.date);
        wantedDay.setDate(wantedDay.getDate() + offset);

        const formattedDate = getSofiaDateString(wantedDay);

        try {
            setLoading(true);
            const newQuestion = await get<Question>(endpoints.specific(formattedDate));
            setQuestion(newQuestion);
        }
        catch (e) {
            console.error(e);
        }
    }

    function preSetAnswers(data: Question) {
        const questionAnswered: SavedAnswer | undefined = user?.answers.find((q: SavedAnswer) => q.date! === data.date);

        if (questionAnswered) {
            setIsSubmitted(true);
            setSelectedAnswer(questionAnswered.selected);
            setCorrectAnswerIndex(questionAnswered.correctAnswerIndex);
        }
        else {
            setIsSubmitted(false);
            setSelectedAnswer(null);
            setCorrectAnswerIndex(null);
        }

        setLoading(false);
    }

    async function handleSubmit(e: any): Promise<void> {
        e.preventDefault();
        if (selectedAnswer === null) return;

        const { isCorrect, correctAnswerIndex }: { isCorrect: boolean, correctAnswerIndex: number } = await get(endpoints.submitSpecific(question?.date!), { selectedAnswer });
        setCorrectAnswerIndex(correctAnswerIndex);

        setIsSubmitted(true);

        if (user?.answers.find(q => q.date === question?.date) === undefined) {
            const newAnswers: SavedAnswer[] = await put(endpoints.submitAnswer, {
                date: question?.date!,
                isCorrect: isCorrect,
                selected: selectedAnswer!,
                id: user?._id
            });

            setUser(prev => {
                if (!prev) return prev;

                return {
                    ...prev,
                    answers: newAnswers
                };
            });
        }

        if (isCorrect) {
            setShowXpGain(true);

            setTimeout(() => {
                setShowXpGain(false);
            }, 2500);

            if (user) {
                setUser(prev => {
                    prev!.xp += xpLevels[question?.difficulty!];
                    return prev;
                });
            }
        }
    }

    useEffect(() => {
        getQuestionData();
    }, []);

    useEffect(() => {
        setShowXpGain(false);
    }, [question]);

    useEffect(() => {
        if (!question || !user) return;

        preSetAnswers(question);
    }, [question, user]);

    return (
        <>
            <main id='questions-page'>
                <article className="day">
                    <button disabled={question?.previousExists === false || loading} onClick={() => getDiffQuestion(-1)} >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
                        </span>
                    </button>
                    <h2>Day {loading ? "..." : question?.dayNumber}</h2>
                    <button disabled={question?.nextExists === false || loading} onClick={() => getDiffQuestion(1)} >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
                        </span>
                    </button>
                </article>

                {
                    loading ? <Spinner /> :
                        <article className="question-card">
                            <div className={`xp-gain ${showXpGain ? "show" : ""}`}>
                                +{xpLevels[question?.difficulty!]} XP
                            </div>

                            <section className="question-info">
                                <article>
                                    <div>
                                        {question?.topic}
                                    </div>
                                    <div className={question?.difficulty}>
                                        <span>
                                            {/* {question?.difficulty === "Beginner" && "🌱"}
                                            {question?.difficulty === "Intermediate" && "⚔️"}
                                            {question?.difficulty === "Advanced" && "💀"} */}
                                            {question?.difficulty === "Beginner" && "🌱"}
                                            {question?.difficulty === "Intermediate" && "🔥"}
                                            {question?.difficulty === "Advanced" && "🩸"}
                                        </span>
                                        {question?.difficulty}
                                    </div>
                                </article>
                                <article>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
                                    <p>+{xpLevels[question?.difficulty!]} XP</p>
                                </article>
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

export default QuestionsPage;