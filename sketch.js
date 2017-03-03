
// First take on getting my circles by ID, so I can create a rollover segment for activating slider values
// var el = document.createElement('ellipse'); 
// var element = document.getElementById(el); 

// Variables for drawing UI circles
var cols = 5;
var rows = 5;

// DoRequest (XMLHttpRequest) variables
var currentLights;
var globalR;
var globalG;
var globalB;
var globalRotD;
var globalRotA;

var button;

// var lampIndex = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

function setup() {
    createCanvas(1000, 1000);
    textSize(15);

    //button = createButton("spiralSequence"); 
    //position.button(200,200);

    // create sliders
    rSlider = createSlider(0, 255, 100);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, 255);
    bSlider.position(20, 80);
    rotASlider = createSlider(0, 255, 255);
    rotASlider.position(20, 130);
    rotDSlider = createSlider(0, 255, 255);
    rotDSlider.position(20, 160);

    //  randomButton = createButton(); 
    //  randomButton.position(20,20);
}

function draw() {

    // button.Mousepressed(spiralRequest);

    sliders();
    buildUI();
    // doHttpRequest();

    // while (mouseClicked) {
    // spiralHttpRequest();
    // }

}

function sliders() {

    var r = rSlider.value();
    var g = gSlider.value();
    var b = bSlider.value();
    var rotA = rotASlider.value();
    var rotD = rotDSlider.value();
    //var randomSequence = randomButton.value();
    background(r, g, b);
    text("Red", rSlider.x * 2 + rSlider.width, 35);
    text("Green", gSlider.x * 2 + gSlider.width, 65);
    text("Blue", bSlider.x * 2 + bSlider.width, 95);
    text("rotationAngle", rotASlider.x * 2 + gSlider.width, 145);
    text("rotationDirection", rotDSlider.x * 2 + bSlider.width, 175);
    text("rotationDirection", rotDSlider.x * 2 + bSlider.width, 175);

}


function buildUI() {

    // Nested for loops of ellipses
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {

            var x = i * 60;
            var y = j * 60;

            ellipse(x + width / 2 - 100, y + height / 2 - 100, 70, 70);
        }
    }
}
/*  
function doHttpRequest(url) { 
 var xmlHttp = new XMLHttpRequest(); 
 xmlHttp.open( "GET", url, false ); // false for synchronous request
 xmlHttp.send( null );
 return xmlHttp.responseText;
}

  function mouseEnter (row, column, distance, rotation, index) {

        if(currentLights.indexOf(index) >= 0) {
            return;
        }
        
        const color = convertScales(distance, 137, -2538, 0x000000, 0xffffff, true);
        const rgb = hexToRgb(color);
        
        if(! rgb){
            return;
        } 
             
        const angle =  convertScales(distance, -1, 1, 1, 12, true);
        const direction = (Math.floor(Math.random() * 2)) - 1; 
        const params = {
                fq1: 1,
                fq2: rgb.r || 0,
                fq3: rgb.g || 0 ,
                fq4: rgb.b || 0 ,
                fq5: 1,
                fq6: direction || 0 ,
                fq7: angle || 0 ,
        };

        
        doHTTPRequest('http://192.168.4.'+ (index+1) +'/'+ serialize(params));
        currentLights.push(index);
        setTimeout(removeFromList, 2000, index);

        console.log('hit', currentLights.length);
        
        TweenMax.to("#el_"+row+"_"+column, .4, {css:{backgroundColor:color, transform: {rotate: angle}}});
        socket.emit('PRESS', {row: row, column: column});
    }

*/
function spiralHttpRequest(i, globalR, globalG, globalB, globalRotD, globalRotA) {

    var rotation = .1;
    var awayStep = .1;
    // How far to rotate around center for each side.
    var aroundStep = .1;// 0 to 1 based.

    // Convert aroundStep to radians.
    var aroundRadians = aroundStep * 2 * Math.PI;

    // Convert rotation to radians.
    rotation *= 2 * Math.PI;

    // For every side, step around and away from center.
    // 50 number of points i'm using
    for (var i = 1; i <= 50; i++) {

        // How far away from center
        var away = i * awayStep;

        // How far around the center.
        var around = i * aroundRadians + rotation;

        // Convert 'around' and 'away' to X and Y.
        // elY and elX are the circle position in the grid (1,1) or (1,5)..
        var x = Math.abs(Math.ceil(elX + Math.cos(around) * away));
        var y = Math.abs(Math.ceil(elY + Math.sin(around) * away));

        // find the index (end of the ip address) based on x and y of the current light
        var index = (x * 5) + y + 1;

        // call the method that will hit up the lights
        anim(x, y, index - 1, i)
    }

}
