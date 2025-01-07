import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";
import { getStaticData, pollResource } from "./resourceManager.js";
import { ipcMainHandle, isDev } from "./utils.js";

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

    if (isDev()) {
        // if app is on development load the frontend from the react live url
        mainWindow.loadURL("http://localhost:3000");
    } else {
        // if not load the frontend from the html file
        mainWindow.loadFile(path.join(app.getAppPath(), "dist-ui/index.html"));
    }

    pollResource(mainWindow);
    ipcMainHandle("getStaticData", getStaticData);
});
