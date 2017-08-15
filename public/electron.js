const electron = require('electron');
const app = electron.app;
app.commandLine.appendSwitch('remote-debugging-port', '8315');
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

let mainWindow;
let windowOptions = {
    width: 185,
    height: 150,
    frame: false,
    resizable: false,
    alwaysOnTop: true
};
function createWindow() {
  mainWindow = new BrowserWindow(windowOptions);
  mainWindow.setPosition(0, electron.screen.getPrimaryDisplay().size.height - 150)
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // app.quit();
  }
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }

});
