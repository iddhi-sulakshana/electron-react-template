const electron = require("electron");

// allows bridge data between electron process and main window
electron.contextBridge.exposeInMainWorld("electron", {
    // methods to expose to frontend
    subscribeStatistics: (callback) => {
        electron.ipcRenderer.on("statistics", (event, data) => {
            callback(data);
        });
    },
    getStaticData: () => electron.ipcRenderer.invoke("getStaticData"),
} satisfies Window["electron"]);
