import { LAUNCH_DATE } from "../server.js";

export function getSofiaDateString(date = new Date()) {
    const timezone = process.env.TIMEZONE || "Europe/Sofia";
    return new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);
}

export function getDayNumber(date) {
    return Math.floor((new Date(date) - LAUNCH_DATE) / (1000 * 60 * 60 * 24)) + 1;
}