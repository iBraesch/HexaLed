function Butterfly (name) {
    Effect.call(this, name);
    this.param.a = 50;
    this.param.rotAngle = -Math.PI/4;
    this.param.tau = 1000;
    this.z = [];
	this.updateParameters();
};

Butterfly.prototype.start = function() {
    if(typeof this.colorAnime === 'undefined') {
        this.colorAnime = anime({
            targets: 'circle',
            fill: (el,i) => {return ['hsl('+this.z[i]+', 100%, 50%)', 'hsl('+Math.floor(0.5*this.z[i])+', 100%, 50%)']},
            duration: this.param.tau,
            duration: 1000,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
        });
    } else if (this.colorAnime.paused) {
        this.colorAnime.play();
    } else {
        this.colorAnime.restart();
    }
};


Butterfly.prototype.pause = function() {
    if(typeof this.colorAnime !== 'undefined' && !this.colorAnime.paused) {
        this.colorAnime.pause();
    }
};


Butterfly.prototype.stop = function() {
    if(typeof this.colorAnime !== 'undefined') {
        this.colorAnime.reset();
    }
}

Butterfly.prototype.updateParameters = function() {
    this.z = [];
    $.each( leds, ( key, value ) => {
        this.z.push(this.butterflyFcn(value.cx(),value.cy()));
    });
    this.z = scale(this.z,0,360);
    if(typeof this.colorAnime !== 'undefined') {
        this.colorAnime = anime({
            targets: 'circle',
            fill: (el,i) => {return ['hsl('+this.z[i]+', 100%, 50%)', 'hsl('+Math.floor(0.5*this.z[i])+', 100%, 50%)']},
            duration: this.param.tau,
            duration: 1000,
            easing: 'easeInOutQuad',
            direction: 'alternate',
            loop: true,
        });
    }
}

Butterfly.prototype.butterflyFcn = function(x,y) {
    var c = Math.cos(this.param.rotAngle);
    var s= Math.sin(this.param.rotAngle);
    var X = x*c+y*s;
    var Y = -x*s+y*c;
    return Math.abs((X*X-Y*Y)*Math.sin((X+Y)/this.param.a)/(X*X+Y*Y));
}