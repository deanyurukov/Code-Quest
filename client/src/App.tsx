import { useEffect, useState } from "react";
import { get } from "./api/requester";
import { endpoints } from "./api/endpoints";
import Answer from "./components/Answer.js";

function App() {
    interface Question {
        id: string;
        date: string,
        question: string,
        answers: string[],
        topic: string,
        difficulty: string,
        correctAnswerIndex: number,
        dayNumber: number
    }

    const [question, setQuestion] = useState<Question | null>(null);
    const letters: string[] = ["A", "B", "C", "D"];
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    async function getQuestion(): Promise<void> {
        const data = await get<Question>(endpoints.today);
        setQuestion(data);
    }

    function handleSubmit(e: any): void {
        e.preventDefault();
        setIsSubmitted(true);
    }

    useEffect(() => {
        void getQuestion();
    }, []);

    return (
        <>
            <header>
                <section className="title">
                    <img src="/images/logo.png" alt="logo" />
                    <p>Code Quest</p>
                </section>

                <section className="day">
                    <button>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-fg-d3bl34="0.8:0.125:node_modules/lucide-react:339:31:12390:35:e:ChevronLeft::::::O1c" data-fgid-d3bl34=":r11:"><path d="m15 18-6-6 6-6"></path></svg>
                        </span>
                    </button>
                    <h2>Day {question?.dayNumber}</h2>
                    <button disabled>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-fg-d3bl35="0.8:0.125:node_modules/lucide-react:339:69:12428:36:e:ChevronRight::::::ByYJ" data-fgid-d3bl35=":r18:"><path d="m9 18 6-6-6-6"></path></svg>
                        </span>
                    </button>
                </section>
            </header>

            <main>
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
                            <Answer key={i} answer={answer} letter={letters[i]} selected={selectedAnswer} setSelected={setSelectedAnswer} index={i} correctIndex={question.correctAnswerIndex} isSubmitted={isSubmitted} />
                        ))
                    }
                </section>

                { !isSubmitted && <button disabled={selectedAnswer === null} onClick={handleSubmit}>Submit Answer</button> }
            </main>
        </>
    );
}

export default App;