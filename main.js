const electron = require("electron");
const { app, BrowserWindow } = electron;
const path = require("path");
let mainWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL("file://" + path.join(__dirname, 'index.html'));
  mainWindow.on("closed", function () {
    app.quit();
  });
});