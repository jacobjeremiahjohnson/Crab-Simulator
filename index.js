// https://docs.google.com/document/d/18BcuCWor4hgtS_EwAWBTJOp9TZmFc8nn81btmvg1E-Y/edit?usp=sharing

/*
- Informational text is "dim"
- Narrator speech is "green"
- Character's speech is "cyan"
- Other character's speech are "yellow", "blue", and "purple" in that order
- Onomonopoeia and other sounds are "red"
- God and stat level ups are "rainbow"
- Use "rainbow" and "white" very sparingly

- Carlos (Carlos Sandchez) is a reoccurring friend character for the crab now

TIMINGS
wait is how long to wait before next instruction, default 0.5
text speed is how long normal letters take, default 0.04
slow text speed is recommended to be 0.06
fast text speed is recommended to be 0.02
*/

/* LIST OF DEATHS
01 - depression.js Crab suicide
02 - burnWitch.js Burnt to a crisp
03 - /chainDays/oldGuyDrugs/oldGuyDrugs_2.js Oyster-piod overdose
04 - /chainDays/cringeNarrator.js Cringed to death
05 - /multiDays/oldGuyDrugs/oldGuyDrugs_2.js M'shark-er fume overdose
06 - /multiDays/robberyTime/robberyTime_3.js Buff crab beat up
07 - /multiDays/oldGuyDrugs/oldGuyDrugs_2.js Apartment flooding
08 - /chainDays/crabExamDeath.js Not licensed to crab
09 - cookingCompetition.js Automobile gakked you
10 - /chainDays/presidentStay.js Assassination
11 - fisherman.js Cooked and eaten
12 - coolCrabs.js Beat up real "oof ouch owie" like
13 - prisonersDilemma.js Prison time
14 - /chainDays/secretMeeting.js Ouch ow fire
15 - /multiDays/restaurant_2.js Stalking and choking
16 - coding.js Code error
*/

// npm modules
const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")

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
  }
})

app.on("ready", () => {

})

ipcMain.on("updatePresence", (e, arg) => {
  client.updatePresence({
    details: arg,
    largeImageKey: "icon",
    instance: false
  })
})

ipcMain.on("showMessageBox", (e, arg) => {
	e.returnValue = dialog.showMessageBoxSync(arg)
})
