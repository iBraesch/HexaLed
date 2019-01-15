var leds = [];
function start() {
  //SVG Drawing
  var draw = SVG('drawing').viewbox(-150, -150, 300, 300);

  //Draws the center led ring
  Array.prototype.push.apply(leds, drawLedRing(draw, 0, 0));
  //Draws the 6 middle led rings
  for (var i = 0; i < 6; i++) {
    Array.prototype.push.apply(leds, drawLedRing(draw, 60 * Math.cos(Math.PI+Math.PI * i / 3), 60 * Math.sin(Math.PI+Math.PI * i / 3)));
  }
  //Draws the 12 outer led rings
  for (var i = 0; i < 6; i++) {
    Array.prototype.push.apply(leds, drawLedRing(draw, 120 * Math.cos(Math.PI+Math.PI * i / 3), 120 * Math.sin(Math.PI+Math.PI * i / 3)));
    Array.prototype.push.apply(leds, drawLedRing(draw, 120 * Math.sqrt(3) / 2 * Math.cos(Math.PI + Math.PI / 6 + Math.PI * i / 3), 120 * Math.sqrt(3) / 2 * Math.sin(Math.PI + Math.PI / 6 + Math.PI * i / 3)));
  }
}

function drawLedRing(parent, x, y) {
  var ledRing = parent.group().addClass('ledRing');
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

function oneByOne(leds, color) {
	var i = 0;
	setInterval(function () {
		leds[(i-1+228)%228].fill('black');
		leds[i].fill(color);
		i=(i+1)%228;
	}, 50);
}








function night() {
	$("#drawing").toggleClass("night");
	//$(".led rect").toggleClass("night");
	$('.led').each(function() {
		  this.instance.toggleClass("night");
		})
}