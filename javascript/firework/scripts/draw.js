var stop = 1;
var x = 0;
var y = 0;
var w = 30;

var interval = 50;
var vx = 5;
var vy = 10;
var tic_count = 0;
var zoom = 1.01;

function start(){
    stop = 0;
    x = 0;
    y = 0;
    w = 30;
    tic_count = 0;
    drawOnce();
}

function drawOnce(){
    var canvas = document.getElementById("drawCanvas");
    var ctx = canvas.getContext("2d");
    // Always clean up whole canvas first before draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (stop == 1){
        // done
        return;
    }
    // calculate
    tic_count += 1;
    x = vx*tic_count;
    y = canvas.height  - (vy - 0.05*tic_count) * tic_count;
    w *= zoom;
    // stop if out of bound
    if (x > canvas.width || y > canvas.height){
        stop = 1;
        return;
    }
    
    draw(x, y, w, ctx);
    
    setTimeout(drawOnce, interval);
}

//
function draw(x, y, sz, ctx){
    var center_x = x + sz/2;
    var center_y = y + sz/2;
    var radius = sz/2;
    
    ctx.beginPath();
    
    var PI = 3.1415926;
    var num_corners = 5;
    var delta = 2*PI*2/num_corners;
    
    var theta = -PI/2;
    var from_x = radius * Math.cos(theta) + center_x;
    var from_y = radius * Math.sin(theta) + center_y;
    
    var i = 0;
    for (i = 0; i < num_corners; ++i)
    {
        theta += delta;
        var to_x = radius * Math.cos(theta) + center_x;
        var to_y = radius * Math.sin(theta) + center_y;
        
        ctx.moveTo(from_x, from_y);
        ctx.lineTo(to_x, to_y);
        from_x = to_x;
        from_y = to_y;
    }
    
    ctx.strokeStyle = "#0000ff";
    ctx.stroke();
}

function stopDraw(){
    stop = 1;
}
