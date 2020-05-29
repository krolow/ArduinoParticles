window.onload = function () {
	var particleManager = new ParticleManager();
	var socket = io.connect('http://localhost:8090/');
	
	socket.on('connect', function () {
		//console.log('connected');
		socket.on('data', function (data) {
			particleManager.addParticles(data.length);
		});
	});
};