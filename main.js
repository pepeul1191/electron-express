const electron = require('electron')
const {app, BrowserWindow} = electron

function createWindow () {
  // Crea la ventana del navegador.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // y carga el  index.html de la aplicación.
  win.loadFile('views/index.html')
}

app.whenReady().then(createWindow)