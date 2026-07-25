import { LAUNCH_DATE } from "../server.js";

export default function getDayNumber(date) {
    return Math.floor((new Date(date) - LAUNCH_DATE) / (1000 * 60 * 60 * 24)) + 1;
}