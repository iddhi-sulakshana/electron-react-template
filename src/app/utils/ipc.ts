import { ipcMain, WebContents, WebFrameMain } from "electron";
import { pathToFileURL } from "url";
import { getUiPath } from "../pathResolver.js";
import { isDev } from "./environment.js";

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key: Key,
    handler: () => EventPayloadMapping[Key]
) {
    ipcMain.handle(key, (event) => {
        validateEventFrame(event.senderFrame);
        return handler();
    });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    webContents: WebContents,
    payload: EventPayloadMapping[Key]
) {
    webContents.send(key, payload);
}

function validateEventFrame(frame: WebFrameMain | null) {
    if (!frame) {
        throw new Error("Invalid event frame");
    }
    if (isDev() && new URL(frame.url).host === "localhost:3000") {
        return;
    }
    if (frame.url !== pathToFileURL(getUiPath()).toString()) {
        throw new Error("Invalid event frame");
    }
}
