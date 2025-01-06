import { app, BrowserWindow } from "electron";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";

const isDev = process.env.NODE_ENV === "development";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        width: 1080,
        height: 660,
        title: "Vite + React",
        icon: path.resolve("./app-icon.png"),
        webPreferences: {
            preload: getPreloadPath(),
        },
    });

    if (isDev) {
        // if app is on development load the frontend from the react live url
        mainWindow.loadURL("http://localhost:3000");
    } else {
        // if not load the frontend from the html file
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-ui/index.html"));
    }
});
