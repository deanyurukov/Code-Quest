import { useEffect, useState } from "react";
import { getTimeUntilNextQuestion } from "../helpers/getTimeUntilNextQuestion.ts";

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState<{ hours: string, minutes: string, seconds: string }>({ hours: "0", minutes: "0", seconds: "0" });

    useEffect(() => {
        const update = () => {
            const time = getTimeUntilNextQuestion();
            setTimeLeft(time);


            if (Number(time.hours) === 0 && Number(time.minutes) === 0 && Number(time.seconds) === 0) {
                window.location.reload();
            }
        };

        update();

        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <article className="countdown-card">
            <section>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock" data-fg-d3bl102="0.8:3.6013:node_modules/lucide-react:605:11:22440:58:e:Clock::::::EGEm" data-fgid-d3bl102=":r1lk:"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </span>
                <h4>Next question unlocks in...</h4>
            </section>

            <section>
                <div className="time-group">
                    <div>
                        <p>{timeLeft.hours[0]}</p>
                        <p>{timeLeft.hours[1]}</p>
                        
                        <span>:</span>
                    </div>
                    <span>Hours</span>
                </div>

                <div className="time-group">
                    <div>
                        <p>{timeLeft.minutes[0]}</p>
                        <p>{timeLeft.minutes[1]}</p>

                        <span>:</span>
                    </div>
                    <span>Minutes</span>
                </div>

                <div className="time-group">
                    <div>
                        <p>{timeLeft.seconds[0]}</p>
                        <p>{timeLeft.seconds[1]}</p>
                    </div>
                    <span>Seconds</span>
                </div>
            </section>
        </article>
    );
}

export default Countdown;