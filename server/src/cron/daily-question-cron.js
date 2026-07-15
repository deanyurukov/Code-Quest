import cron from "node-cron";
import { spawn } from "child_process";

const task = cron.schedule("0 0 * * *", () => {
    console.log("Scheduling today's question worker...");
    const workerPath = new URL("./daily-question-worker.js", import.meta.url).pathname;
    // Spawn a detached Node process to run the worker so the scheduler process stays responsive.
    spawn(process.execPath, [workerPath], { detached: true, stdio: 'ignore' }).unref();
});

task.on('execution:missed', () => {
  task.execute();
});