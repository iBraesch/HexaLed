function OneByOne (name) {
    Effect.call(this,name);
    this.param.colorR = 255;
    this.param.colorG = 0;
    this.param.colorB = 0;
    this.param.tau = 500;
    this.updateParameters();
    $(".effectParameters.OneByOne input[name='paramColorR']").on('change',(e) => {this.param.colorR = parseInt(e.target.value)});
    $(".effectParameters.OneByOne input[name='paramColorG']").on('change',(e) => {this.param.colorG = parseInt(e.target.value)});
    $(".effectParameters.OneByOne input[name='paramColorB']").on('change',(e) => {this.param.colorB = parseInt(e.target.value)});
    $(".effectParameters.OneByOne input[name='paramTau']").on('change',(e) => {this.param.tau = parseInt(e.target.value)});
};

OneByOne.prototype.start = function() {
    if(typeof this.colorAnime === 'undefined') {
        this.colorAnime = anime({
            targets: 'circle',
            fill: ['rgb('+this.param.colorR+','+this.param.colorG+','+this.param.colorB+')', 'rgb(0,0,0)'],
            duration: this.param.tau,
            delay: (el,i) => {return i*this.param.tau;},
            easing: 'easeInOutQuad',
            //direction: 'alternate',
            loop: true,
            update: sendData
        });
    } else if (this.colorAnime.paused) {
        this.colorAnime.play();
    } else {
        this.colorAnime.restart();
    }
};


OneByOne.prototype.pause = function() {
    if(typeof this.colorAnime !== 'undefined' && !this.colorAnime.paused) {
        this.colorAnime.pause();
    }
};


OneByOne.prototype.stop = function() {
    if(typeof this.colorAnime !== 'undefined') {
        this.colorAnime.reset();
    }
}

OneByOne.prototype.updateParameters = function() {
    if(typeof this.colorAnime !== 'undefined') {
        this.colorAnime = anime({
            targets: 'circle',
            fill: ['rgb('+this.param.colorR+','+this.param.colorG+','+this.param.colorB+')', 'rgb(0,0,0)'],
            duration: this.param.tau,
            delay: (el,i) => {return i*this.param.tau;},
            easing: 'easeInOutQuad',
            //direction: 'alternate',
            loop: true,
            update: sendData
        });
    }
}