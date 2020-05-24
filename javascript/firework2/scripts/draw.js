var stop = 1;

var canvas_height = 0;
var canvas_width = 0;
var PI = 3.1415926;
var interval = 50;

var zoom = 1.01;
var stars = [];
var flowers = [];
var outofbound = 0;

var alter = 0;
// Start button calls this
function start(){
    stop = 0;
    stars = [];
    
    // Draw flowers and stars alternatively
    if (alter == 0)
    {
        alter = 1;
        flowers = Flower.getFlowers();
    }
    else {
        stars = Star.getStars();
        alter = 0;
    }
    
    outofbound = 0;
    drawOnce();
}

// Stop button calls this
function stopDraw(){
    stop = 1;
}


// ----- Utility function


function drawOnce(){
    var canvas = document.getElementById("drawCanvas");
    canvas_height = canvas.height;
    canvas_width = canvas.width;
    
    var ctx = canvas.getContext("2d");

    if (stop == 1){
        // done
        return;
    }
    // Always clean up whole canvas first before draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grd.addColorStop(0, "#000000");
    grd.addColorStop(1, "#888888");

    
    //ctx.fillStyle = grd;
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "100px Arial";
    ctx.fillStyle = "#fa9eb8";
    ctx.fillText("Happy Birthday", 80, canvas.height - 50);
    
    // calculate
    var i = 0;
    outofbound = 0;
    if (alter == 0)
    {
        for (i = 0; i < stars.length; ++i){
            var star = stars[i];
            star.tickOnce();
            star.draw(ctx);
            star.drawTrack(ctx);
        }
    }
    else {
        for (i = 0; i < flowers.length; ++i){
            var flower = flowers[i];
            flower.tickOnce();
            flower.draw(ctx);
            flower.drawTrack(ctx);
        }
    }
    if ((outofbound == stars.length && alter == 0) ||
        (outofbound == flowers.length && alter == 1)){
        // restart
        start();
        return;
    }
    
    setTimeout(drawOnce, interval);
}


