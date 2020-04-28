const electron = require('electron')
// require('electron-reload')(__dirname)
const {app, BrowserWindow, ipcMain} = electron

ipcMain.on('start-server', (event, host, port) => {
  console.log('start-server')
  console.log(host)
  console.log(port)
});  

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('src/views/index.html')
}

app.whenReady().then(createWindow)