export function getSofiaDateString(date = new Date()) {
    const timezone = process.env.TIMEZONE || "Europe/Sofia";
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}