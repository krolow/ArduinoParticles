const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const app = express()//instancia de express
const server = http.createServer(app)//creando el server con http y express como handle request
const io = socketio(server)//iniciando el server de socket.io

var SerialPort = require('serialport');
var serialPort = new SerialPort('/dev/ttyUSB0');

app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.get('/', function(req, res){
    res.render('index.html');
});

io.on('connection', function (socket) {
	serialPort.on('data', function (data) {
		socket.broadcast.emit('data', data.toString());
	});
	
});

server.listen(8090);
