const { ipcRenderer } = require('electron')
const express = require('express')
const path = require('path')
const logger = require('morgan')

const txtHost = document.getElementById('txtHost')
const txtPort = document.getElementById('txtPort')
const txtDir = document.getElementById('txtDir')
const btnRun = document.getElementById('btnRun')
const btnStop = document.getElementById('btnStop')
const lbMessage = document.getElementById('lbMessage')
const containerLogs = document.getElementById('logs')

const appExpress = express()
let server

const preResponse = function (req, res, next) {
  printLog(req.method + req.path, 'TODO', 'pre-response')
  //console.log(req.method + '/' + req.path)
  next()
}

function printLog(message, status, type){
  // pre-response, start, stop
  if(type == 'pre-response'){
    var span = document.createElement('SPAN')
    span.innerHTML = '> '
    span.classList = 'color-yellow bold'
    containerLogs.appendChild(span)
  }
  var log = document.createElement('CODE')
  log.innerHTML = message
  if(status == 'error'){
    log.classList = 'color-error'
  }
  containerLogs.appendChild(log)
  var br = document.createElement('BR')
  containerLogs.appendChild(br)
}

btnStop.addEventListener('click', function(event){
  server.close()
  btnRun.disabled = false
  btnStop.disabled = true
  txtDir.disabled = false
  txtHost.disabled = false
  txtPort.disabled = false
  printLog('El servidor se ha detenido', 'success', 'stop')
})

btnRun.addEventListener('click', function(event){
  event.preventDefault();   // stop the form from submitting
  let host = txtHost.value
  let port = txtPort.value
  let dir = txtDir.value
  let next = true
  if(host == ''){
    host = 'localhost'
  }
  if(port == ''){
    port = '3000'
  }
  if(dir == ''){
    // dir = '/home/pepe/Imágenes'
    next = false
    printLog('Debe ingresar una ruta de su disco', 'error', 'error')
  }
  if(next){
    // run epxress server
    appExpress.use(logger('dev'))
    appExpress.use(preResponse)
    appExpress.use(express.static(path.join(dir)))
    server = appExpress.listen(port, function () {
      console.log('Example app listening on port ' + port + '!');
      printLog('Servidor arrancó en el puerto ' + port, 'success', 'start')
    });  
    btnRun.disabled = true
    txtDir.disabled = true
    txtHost.disabled = true
    txtPort.disabled = true
    btnStop.disabled = false
    ipcRenderer.send('start-server', host, port)
  }
});
