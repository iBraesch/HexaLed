function randomBurst() {
    setInterval(lightRandomRing,300);
}

function lightRandomRing() {
    var ring = Math.floor(Math.random()*19);
    lightRing(ring);
}

function lightRing(ring) {
    for(var i=12*ring;i<12*(ring+1);i++) {
        if (typeof leds[i].timeout !== 'undefined') {
            clearTimeout(leds[i].timeout);
        }
        leds[i].attr({ fill: '#FFF' })
        leds[i].timeout = setTimeout(off, Math.random() * (1000-500)+500, leds[i]);
    }
}

function off(led) {
    //led.fill('black');
    led.animate(500, '<>', 0).attr({ fill: '#000' })
}