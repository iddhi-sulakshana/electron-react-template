import path from "path";
import { app } from "electron";
import { isDev } from "./utils/ipc.js";

export function getPreloadPath() {
    return path.join(
        app.getAppPath(),
        isDev() ? "." : "..",
        "/dist-app/preload.cjs"
    );
}

export function getUiPath() {
    return path.join(app.getAppPath(), "/dist-ui/index.html");
}
