var express = require('express');
var io = require('socket.io');
var app = express.createServer();
var io = io.listen(app);
var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort('/dev/tty.usbserial-A800G0JO');

app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.get('/', function(req, res){
    res.render('index.html');
});

io.sockets.on('connection', function (socket) {
	
	serialPort.on('data', function (data) {
		socket.broadcast.emit('data', data.toString());
	});
	
});

app.listen(8090);