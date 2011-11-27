function ParticleManager() {
	//load canvas
	this.canvas = new Canvas();
	this.ParticleManager();this.properties
}

ParticleManager.prototype.ParticleManager = function () {
	var self = this;
	this.MAX = 300;
	this.particles = [];

	var stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	document.body.appendChild(stats.domElement);	
	//loop
	setInterval(function () {
		self.properties = self.canvas.getProperties();
		self.clear();
		self.draw();
		stats.update();
	}, 1000 / 30);
};

ParticleManager.prototype.clear = function () {
	this.properties.context.clearRect(0, 0, this.properties.width, this.properties.height);
};

ParticleManager.prototype.addParticles = function (number) {
	while (this.particles.length <= this.MAX && number > 0) {
		this.addParticle();
		number--;
	}
};

ParticleManager.prototype.addParticle = function () {
	this.particles.push(new Particle(this.properties.c_width, this.properties.c_height));	
};

ParticleManager.prototype.draw = function () {
	for (var i=0; i<this.particles.length; i++) {
		if (!this.check(i)) {
			continue;
		}
		this.particles[i].render(this.properties.context);
		this.particles[i].update();
	}		
};

ParticleManager.prototype.check = function (i) {
	if (this.particles[i].opacity <= 0 ||
		this.particles[i].x > this.properties.width ||
		this.particles[i].y > this.properties.height ||
		this.particles[i].x < 0 ||
		this.particles[i].y < 0) {
		this.particles.splice(i, 1);

		return false;
	}

	return true;
};

function Particle(x, y) {
	//constructor
	this.Particle(x, y);
}

Particle.prototype.Particle = function (x, y) {
	this.friction = 0.90;
	//variables
	this.size = this.random(0.5, 26);
	this.speedX = this.random(-10, 10);
	this.speedY = this.random(-10, 10);
	this.x = x;
	this.y = y;

	this.opacity = this.random(1, 10);
};

Particle.prototype.random = function (max, min) {
	return ((Math.random()*(max-min)) + min);	
};

Particle.prototype.render = function (context) {
	var image = new Image();
	image.src = '/img/particle.png';

	context.save();
	context.globalAlpha = this.opacity;

	var self = this;
	image.onload = function () {
		context.drawImage(image, self.x, self.y, self.size, self.size);
	};
	
	context.restore();
};

Particle.prototype.update = function () {
	this.x += this.speedX;
	this.y += this.speedY;
	// this.speedX *= this.friction;
	// this.speedY *= this.friction;
	this.opacity -= 0.1;
};