var stop = 1;

var canvas_height = 0;
var canvas_width = 0;
var PI = 3.1415926;
var interval = 50;

var zoom = 1.008;
var stars = [];
var flowers = [];
var notes = [];
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
    else if (alter == 1) {
        alter = 2;
        stars = Star.getStars();
    }
    else {
        alter = 0;
        notes = musicNote.getNotes();
    }
    
    outofbound = 0;
    drawOnce();
}

// Stop button calls this
function stopDraw(){
    stop = 1;
}


// ----- Utility function

var textColors = ["#f4a7b9", "#8a6bbe", "#a5dee4"];
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
    grd.addColorStop(1, "#efe8ce");
    grd.addColorStop(0, "#ffffff");

    
    //ctx.fillStyle = grd;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = "100px Arial";
    ctx.fillStyle = textColors[alter];
    ctx.fillText("Happy Birthday", 290, canvas.height - 50);
    
    // calculate
    var i = 0;
    outofbound = 0;
    if (alter == 2)
    {
        for (i = 0; i < stars.length; ++i){
            var star = stars[i];
            star.tickOnce();
            star.draw(ctx);
            star.drawTrack(ctx);
        }
    }
    else if (alter == 0){
        for (i = 0; i < notes.length; ++i){
            var note = notes[i];
            note.tickOnce();
            note.draw(ctx);
            note.drawTrack(ctx);
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
    if ((outofbound == stars.length && alter == 2) ||
        (outofbound == flowers.length && alter == 1) ||
        (outofbound == notes.length && alter == 0)){
        // restart
        start();
        return;
    }
    
    setTimeout(drawOnce, interval);
}


