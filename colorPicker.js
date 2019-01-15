
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

