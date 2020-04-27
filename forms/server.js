const { ipcRenderer } = require('electron')
const express = require('express')
const path = require('path')
const logger = require('morgan')

const txtHost = document.getElementById('txtHost')
const txtPort = document.getElementById('txtPort')
const txtDir = document.getElementById('txtDir')
const btnRun = document.getElementById('btnRun')
const lbMessage = document.getElementById('lbMessage')

const appExpress = express()

const preResponse = function (req, res, next) {
  console.log(req.method + '/' + req.path)
  
  next()
}


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
    dir = '/home/pepe/Imágenes'
    // next = false
    // lbMessage.innerHTML = 'Debe ingresar una ruta de su disco'
  }
  if(next){
    // run epxress server
    appExpress.use(logger('dev'))
    appExpress.use(preResponse)
    appExpress.use(express.static(path.join(dir)))
    appExpress.listen(port, function () {
      console.log('Example app listening on port ' + port + '!');
    });  
    ipcRenderer.send('start-server', host, port)
  }
});
