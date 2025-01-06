import path from "path";
import { app } from "electron";

export function getPreloadPath() {
    return path.join(
        app.getAppPath(),
        process.env.NODE_ENV === "development" ? "." : "..",
        "/dist-app/preload.cjs"
    );
}
