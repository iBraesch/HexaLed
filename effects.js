function animateFunction(fcn, leds) {
    var z = [];
	var pos = 0;
	$.each( leds, function( key, value ) {
			z.push(fcn(value.cx(),value.cy()));
		});
	z=scale(z,0,360);
	var id = setInterval(frame, 5);
	function frame() {
		for(var i=0; i < z.length; i++) {
			leds[i].fill(new SVG.Color(hsvToRgb((z[i]+pos)%360,100,100)).toHex());
			
		}
		pos++
	}
}

function butterfly(x,y) {
	return (x*x-y*y)*Math.sin((x+y)/50)/(x*x+y*y);
}

function scale(arr, a, b) {
	var newArr = [];
	var m = Math.min(...arr);
	var M = Math.max(...arr);
	for(var i=0; i < arr.length; i++) {
		newArr.push((((arr[i] - m) * (b - a)) / (M - m)) + a);
	}
	return newArr;
}

function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;
     
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
     
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
     
    if(s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return [
            Math.round(r * 255), 
            Math.round(g * 255), 
            Math.round(b * 255)
        ];
    }
     
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
     
    switch(i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
     
        case 1:
            r = q;
            g = v;
            b = p;
            break;
     
        case 2:
            r = p;
            g = v;
            b = t;
            break;
     
        case 3:
            r = p;
            g = q;
            b = v;
            break;
     
        case 4:
            r = t;
            g = p;
            b = v;
            break;
     
        default: // case 5:
            r = v;
            g = p;
            b = q;
    }
     
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}