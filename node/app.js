var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort('/dev/ttyACM0');

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

server.listen(8090);
