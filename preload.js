const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
    'dataapi', {
    getlist: () => ipcRenderer.invoke("getlist"),
    setlist: (data) => ipcRenderer.invoke("setlist", data),
});