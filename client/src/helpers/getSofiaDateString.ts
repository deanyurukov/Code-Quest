export function getSofiaDateString(date: Date = new Date()): string {
    const timezone = "Europe/Sofia";
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}