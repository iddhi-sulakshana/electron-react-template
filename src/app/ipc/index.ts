import { BrowserWindow } from "electron";
import { registerStaticDataHandler } from "./staticData.js";
import { pollResource } from "../services/resourceManager.js";

export default function registerHandlers(mainWindow: BrowserWindow) {
    registerStaticDataHandler();
    pollResource(mainWindow);
}
