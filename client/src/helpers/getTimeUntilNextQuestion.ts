export function getTimeUntilNextQuestion(): { hours: string, minutes: string, seconds: string } {
    const now: Date = new Date();

    const sofiaNow: Date = new Date(
        now.toLocaleString("en-US", { timeZone: "Europe/Sofia" })
    );

    const nextMidnight: Date = new Date(sofiaNow);
    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);

    const diff: number = nextMidnight.getTime() - sofiaNow.getTime();

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const hoursStrings = String(hours).padStart(2, "0");
    const minutesStrings = String(minutes).padStart(2, "0");
    const secondsStrings = String(seconds).padStart(2, "0");

    return { hours: hoursStrings, minutes: minutesStrings, seconds: secondsStrings };
}