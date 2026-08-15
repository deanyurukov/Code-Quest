import { useEffect, useState } from "react";
import { calculateDifficultyStats } from "../helpers/calculateDifficultyStats.ts";
import type { SavedAnswer } from "../types/SavedAnswer.ts";

const ProfileUserDifficulty = ({ answers }: { answers: SavedAnswer[] | null }) => {
    const [difficultyStats, setDifficultyStats] = useState<{
        Beginner: {
            answered: number;
            correct: number;
            accuracy: number;
            difficulty: string;
            color: string;
        };
        Intermediate: {
            answered: number;
            correct: number;
            accuracy: number;
            difficulty: string;
            color: string;
        };
        Advanced: {
            answered: number;
            correct: number;
            accuracy: number;
            difficulty: string;
            color: string;
        };
    } | null>(null);

    useEffect(() => {
        if (answers) {
            setDifficultyStats(calculateDifficultyStats(answers));
        }
    }, [answers]);

    return (
        <article className="user-difficulty">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                <h3>Performance by Question difficulty</h3>
            </div>

            <section className="difficulty-stats-container">
                {
                    Object.values(difficultyStats || [
                        { answered: 0, correct: 0, accuracy: 0, difficulty: 'Beginner', color: 'rgb(22, 163, 74)' },
                        { answered: 0, correct: 0, accuracy: 0, difficulty: 'Intermediate', color: 'rgb(217, 119, 6)' },
                        { answered: 0, correct: 0, accuracy: 0, difficulty: 'Advanced', color: 'rgb(220, 38, 38)' }
                    ]).map((stat, i) => (
                        <article key={i}>
                            <section>
                                <div>
                                    <h5>{stat.difficulty}</h5>
                                    <p style={{ color: `${stat.color}` }}>{(stat.accuracy).toFixed(1)}%</p>
                                </div>

                                <span>
                                    <div style={{ width: `${Math.max(stat.accuracy || 0, 1.5)}%`, background: `${stat.color}` }}></div>
                                </span>
                            </section>

                            <p>{stat.correct}/{stat.answered}</p>
                        </article>
                    ))
                }
            </section>
        </article>
    );
}

export default ProfileUserDifficulty;