const electron = require("electron");
const { app, BrowserWindow, ipcMain } = electron;
const path = require("path");
const Store = require('electron-store');
const { Menu } = require("electron");
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

function todo_all_del() {
  Store_Data.delete('ToDoList');
  mainWindow.webContents.send("todo_all_delete");
}

const isMac = (process.platform === 'darwin');
const menu_temp = [
  {
    label: "file",
    submenu: [
      {
        label: "delete item",
        click() {
          todo_all_del();
        }
      },
      {
        label: "quit",
        accelerator: isMac ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (isMac) {
  menu_temp.unshift({
    label: app.name,
    role: "appMenu",
  });
}

if (!app.isPackaged) {
  menu_temp.push({
    label: "devTools",
    submenu: [
      {
        label: "devTools",
        accelerator: process.platform == "darwin" ? "Command+Shift+I" : "Ctrl+Shift+I",
        click(item, focusedwindow) {
          focusedwindow.toggleDevTools();
        }
      },
      {
        label: "reload",
        accelerator: process.platform == "darwin" ? "Command+Alt+R" : "Ctrl+Alt+R",
        role: 'forceReload',
      }
    ]
  });
}

Menu.setApplicationMenu(Menu.buildFromTemplate(menu_temp));