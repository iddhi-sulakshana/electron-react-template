const electron = require("electron");

// allows bridge data between electron process and main window
electron.contextBridge.exposeInMainWorld("electron", {
    // methods to expose to frontend
    getData: (callback: (data: any) => void) => callback({}),
});
