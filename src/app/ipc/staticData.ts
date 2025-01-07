import { getStaticData } from "../services/resourceManager.js";
import { ipcMainHandle } from "../utils/ipc.js";

export function registerStaticDataHandler() {
    ipcMainHandle("getStaticData", () => {
        return getStaticData();
    });
}
