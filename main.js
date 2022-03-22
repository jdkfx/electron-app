const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");
const Store = require('electron-store');
let mainWindow;
const Store_Data = new Store({ name: "data" });

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    width: 320,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });
  mainWindow.loadURL("file://" + path.join(__dirname, 'index.html'));
  mainWindow.on("closed", function () {
    app.quit();
  });
});

ipcMain.handle('getlist', async (event, data) => {
  return Store_Data.get('ToDoList', []);
});

ipcMain.handle("setlist", async (event, data) => {
  Store_Data.set('ToDoList', data);
});