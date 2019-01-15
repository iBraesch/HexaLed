var leds;
function start() {
var draw = SVG('drawing').viewbox(-150, -150, 300, 300)
/*var ledRing = draw.group().addClass('ledRing');
ledRing.path("M 25 25 m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0 M 25 25 m -17.5, 0 a 17.5,17.5 0 1,0 35,0 a 17.5,17.5 0 1,0 -35,0");
var leds = [];
for (var i = 0; i < 12; i++) {
	leds[i] = ledRing.group().addClass('led');
  leds[i].rect(5,5).x(22.5).y(43.5).transform({ rotation: 30*i, cx:25,cy:25 });
  leds[i].circle(4).x(23).y(44).transform({ rotation: 30*i, cx:25,cy:25 });
}*/

function drawLedRing(parent, x, y) {
  var ledRing = draw.group().addClass('ledRing');
  ledRing.path("M " + x + " " + y + " m -25, 0 a 25,25 0 1,0 50,0 a 25,25 0 1,0 -50,0 M " + x + " " + y + " m -17.5, 0 a 17.5,17.5 0 1,0 35,0 a 17.5,17.5 0 1,0 -35,0");
  var leds = [];
  for (var i = 0; i < 12; i++) {
    leds[i] = ledRing.group().addClass('led');
    leds[i].rect(5, 5).x(x + 21*Math.cos(Math.PI * (3 + i) / 6) - 2.5).y(y + 21*Math.sin(Math.PI * (3 + i) / 6) - 2.5).transform({
      rotation: 30 * i//,
      //cx: x,
      //cy: y
    }).fill('white');
    leds[i] = leds[i].circle(4).x(x + 21*Math.cos(Math.PI * (3 + i) / 6) - 2).y(y + 21*Math.sin(Math.PI * (3 + i) / 6) - 2).transform({
      rotation: 30 * i//,
      //cx: x,
      //cy: y
    }).fill('black');
  }
  return leds;
}
leds = [];

Array.prototype.push.apply(leds, drawLedRing(draw, 0, 0));



//drawLedRing(draw,0,0);
for (var i = 0; i < 6; i++) {
  Array.prototype.push.apply(leds, drawLedRing(draw, 60 * Math.cos(Math.PI+Math.PI * i / 3), 60 * Math.sin(Math.PI+Math.PI * i / 3)));
}
for (var i = 0; i < 6; i++) {
  Array.prototype.push.apply(leds, drawLedRing(draw, 120 * Math.cos(Math.PI+Math.PI * i / 3), 120 * Math.sin(Math.PI+Math.PI * i / 3)));
  Array.prototype.push.apply(leds, drawLedRing(draw, 120 * Math.sqrt(3) / 2 * Math.cos(Math.PI + Math.PI / 6 + Math.PI * i / 3), 120 * Math.sqrt(3) / 2 * Math.sin(Math.PI + Math.PI / 6 + Math.PI * i / 3)));
}

colors = ['#0000FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000', '#FF00FF'];
colorPicker = draw.nested().addClass('colorPicker');
colorPicker.path("M 0 0 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 M 0 0 m -2, 0 a 2,2 0 1,0 4,0 a 2,2 0 1,0 -4,0");
var colorsColorPicker = [];
for (var i = 0; i < 6; i++) {
  colorsColorPicker[i] = colorPicker.circle(4).x(4).y(-2).transform({
    rotation: 60 * i,
    cx: 0,
    cy: 0
  }).fill(colors[i]);
}
//var use  = draw.use(colorPicker)
colorPicker.hide();
$(colorPicker.node).mouseleave(function() {
	colorPicker.hide();
});
var currentLed = 0;

var handleLedHoverIn = function(event) {
	var led = event.target.instance;
  currentLed = led;
  colorPicker.move(led.x()+2, led.y()+2);
  colorPicker.show();
}

/*var handleLedHoverOut = function() {
	var led = event.target.instance;
  colorPicker.hide();
}*/

$.each( leds, function( key, value ) {
  value.mouseover(handleLedHoverIn);
  value.click(function (event) {
  	currentLed.fill('#000000');
  })
  //value.get(1).mouseout(handleLedHoverOut);
});

$.each( colorsColorPicker, function(key, value) {
	value.click(function (event) {
  	currentLed.fill(event.target.instance.attr('fill'));
  })
})

function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}

console.log(leds);

var ws = new WebSocket("ws://192.168.0.10:81/js");
ws.binaryType = "arraybuffer";

ws.onmessage = function (event) {
	//console.log(event.data);
	int8arr = new Int8Array(event.data);
	strHex = toHexString(int8arr);
	for(var i = 0; i < 12*19; i++) {
		//console.log("#" + strHex.substr(i*6,6));
		leds[i].select('circle').fill("#" + strHex.substr(i*6,6));
	}
}
}

function oneByOne(leds, color) {
	var i = 0;
	setInterval(function () {
		leds[(i-1+228)%228].fill('black');
		leds[i].fill(color);
		i=(i+1)%228;
	}, 50);
}

function butterfly() {
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

function fcn(x,y) {
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

function night() {
	$("#drawing").toggleClass("night");
	//$(".led rect").toggleClass("night");
	$('.led').each(function() {
		  this.instance.toggleClass("night");
		})
}