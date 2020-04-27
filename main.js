const electron = require('electron')
const express = require('express')
const logger = require('morgan')
const {app, BrowserWindow, ipcMain} = electron

const appExpress = express()

ipcMain.on('start-server', (event, host, port) => {
  console.log(host)
  console.log(port)
  appExpress.use(logger('dev'))
  appExpress.listen(port, function () {
    console.log('Example app listening on port ' + port + '!');
  });  
});  

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.loadFile('views/index.html')
}

app.whenReady().then(createWindow)