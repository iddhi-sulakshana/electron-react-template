const electron = require("electron");

// allows bridge data between electron process and main window
electron.contextBridge.exposeInMainWorld("electron", {
    // methods to expose to frontend
    subscribeStatistics: (callback) => {
        return ipcOn("statistics", (data) => {
            callback(data);
        });
    },
    getStaticData: () => ipcInvoke("getStaticData"),
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof EventPayloadMapping>(
    key: Key
): Promise<EventPayloadMapping[Key]> {
    return electron.ipcRenderer.invoke(key);
}

function ipcOn<Key extends keyof EventPayloadMapping>(
    key: Key,
    callback: (payload: EventPayloadMapping[Key]) => void
): UnsubscribeEvent {
    const cb = (event: Electron.IpcRendererEvent, payload: any) =>
        callback(payload);
    electron.ipcRenderer.on(key, cb);
    return () => electron.ipcRenderer.off(key, cb);
}
