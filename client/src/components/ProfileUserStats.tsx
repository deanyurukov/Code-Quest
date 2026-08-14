import { useEffect, useState } from "react";
import type { User } from "../types/User.ts";
import { calculateOtherStats } from "../helpers/calculateOtherStatistics.ts";

const ProfileUserStats = ({ user, level, streak }: { user: User | null, level: number, streak: number }) => {
    const [otherStats, setOtherStats] = useState<{ questionsAnswered: number; accuracy: number; highestStreak: number; } | null>(null);
    const cards = [
        {
            label: "current streak",
            value: streak,
            icon: <svg style={{ color: "rgb(217, 119, 6)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>,
            iconBackground: "rgba(217, 119, 6, 0.094)"
        },
        {
            label: "best streak",
            value: otherStats?.highestStreak ?? 0,
            icon: <svg style={{ color: "rgb(180, 83, 9)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>,
            iconBackground: "rgba(180, 83, 9, 0.094)"
        },
        {
            label: "accuracy",
            value: `${otherStats?.accuracy ?? 0}%`,
            icon: <svg style={{ color: "rgb(34, 197, 94)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
            iconBackground: "rgba(34, 197, 94, 0.094)"
        },
        {
            label: "answered",
            value: otherStats?.questionsAnswered ?? 0,
            icon: <svg style={{ color: "rgb(59, 130, 246)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>,
            iconBackground: "rgba(59, 130, 246, 0.094)"
        },
        //! maybe change
        {
            label: "total xp",
            value: user?.xp ?? 0,
            icon: <svg style={{ color: "rgb(217, 119, 6)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>,
            iconBackground: "rgba(217, 119, 6, 0.094)"
        },
        {
            label: "level",
            value: `Lvl ${level}`,
            icon: <svg style={{ color: "rgb(139, 92, 246)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>,
            iconBackground: "rgba(139, 92, 246, 0.094)"
        }
    ];

    useEffect(() => {
        if (user) {
            setOtherStats(calculateOtherStats(user.answers));
        }
    }, [user]);

    return (
        <section className="user-stats">
            <h5>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="18" y1="20" y2="10"></line><line x1="12" x2="12" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="14"></line></svg>
                Statistics
            </h5>

            <article>
                {
                    cards.map((card, i) => (
                        <div key={i}>
                            <span style={{ background: `${card.iconBackground}` }}>
                                {card.icon}
                            </span>
                            <h5>{card.value}</h5>
                            <p>{card.label}</p>
                        </div>
                    ))
                }
            </article>
        </section>
    );
}

export default ProfileUserStats;