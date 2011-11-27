ArduinoParticle

A simple example using node.js, canvas and javascript integrated with arduino.

This application depends of, express.js, socket.io and serialport. To install do:

	npm install express
	npm install serialport
	npm install socket.io
	
To run the application, access the node folder and start the app.js
	
	node app.js
	
After that you can access in your browser:

	http://127.0.0.1:8090
	
Probably you will need edit the USB port, so go to app.js at line 6, and edit: 
	
	SerialPort('/dev/tty.usbserial-A800G0JO');
	
	
Demo at youtube: http://www.youtube.com/watch?v=6yl_jmYQLhM


