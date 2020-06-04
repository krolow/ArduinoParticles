const port = require('../serial.js')
var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort(port);
var events = require("events");

function Arduino () {
	
}
Arduino.super_ = events.EventEmitter;
Arduino.prototype = Object.create(events.EventEmitter.prototype, {
    constructor: {
        value: Arduino,
        enumerable: false
    }
});

var Event = new EventEmitter();

var Arduino = function (io) {
	this.client = false;
	this.Arduino();
};

Arduino.prototype = {
	
	Arduino : function () {
		this.readUSB();
	},
	
	readUSB : function () {
		var self = this;
		
		serialPort.on('data', function (data) {
			self.send(data);
		});
	},
	
	send : function (data) {
		if (this.client) {
			this.client.emit('arduino', data);
		}
	}
	
};

exports.module = new Arduino();
