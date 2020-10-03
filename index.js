// npm modules
const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")
var invisWindow;

const client = require("discord-rich-presence")("761407625707126796")

function createWindow() {
  const mainWindow = new BrowserWindow({ // creates the browser window
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 300,
    icon: "./assets/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true
    }
  })
  mainWindow.loadFile("./website/index.html") // loads index.html into window
  mainWindow.on('closed', () => {
   invisWindow.close();
   invisWindow = null;
 })
}

function invisibleWindow() {
  invisWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false
  })
  invisWindow.loadFile("./website/player.html")
}

// waits until app is ready, then creates window
app.whenReady()
  .then(() => {
    createWindow()
    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if(process.platform !== "darwin") {
    app.quit()
    invisWindow.close()
  }
})

app.on("ready", () => {
  invisibleWindow();
})

ipcMain.on("updatePresence", (e, arg) => {
  client.updatePresence({
    details: arg,
    largeImageKey: "icon",
    instance: false
  })
})
