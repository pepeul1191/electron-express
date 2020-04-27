const { remote, ipcRenderer } = require('electron')
const currentWindow = remote.getCurrentWindow()

const txtHost = document.getElementById('txtHost')
const txtPort = document.getElementById('txtPort')
const btnRun = document.getElementById('btnRun')

btnRun.addEventListener('click', function(event){
  event.preventDefault();   // stop the form from submitting
  let host = txtHost.value
  let port = txtPort.value
  if(host == ''){
    host = 'localhost'
  }
  if(port == ''){
    port = '3000'
  }
  ipcRenderer.send('start-server', host, port)
});
