import { watch } from "fs";
import path from "path";
import { spawn } from "child_process";
import kill from "tree-kill";

const watcher = watch(
    path.join(__dirname, "src/app"),
    { recursive: true },
    (event, filename) => {
        console.log(`File ${filename} has been changed`);
        console.log("Restarting electron application...");
        startElectron();
    }
);

let electronProcess;

// Function to start Electron
const startElectron = () => {
    if (electronProcess) {
        // kill the electron process by using pid execution
        const pid = electronProcess.pid;
        kill(pid, "SIGINT", (err) => {
            if (err) {
                console.error("Error killing Electron process:", err);
            }
        });
    }
    console.log("Starting Electron...");
    electronProcess = spawn("bun", ["run", "dev:electron"], {
        stdio: "inherit", // Forward logs to the terminal
        shell: true,
    });

    electronProcess.on("close", (code) => {
        if (code !== null) {
            console.log(`Electron process exited with code ${code}`);
        }
    });
};

// Clean up on exit
process.on("SIGINT", () => {
    console.log("Stopping watcher...");
    if (electronProcess) {
        electronProcess.kill("SIGINT");
    }
    console.log("Closing watcher...");
    watcher.close();
    process.exit();
});

startElectron(); // Start Electron on first run
