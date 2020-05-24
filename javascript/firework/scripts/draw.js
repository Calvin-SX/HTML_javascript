var stop = 1;

var star_sizes = [30, 25, 20, 15, 10];
var star_colors = ["#aaaaff", "#aaffaa", "#ffaaaa", "#ffffaa", "#aaffff"];
var star_vx = [5, 4.5, 4.0, 3.5, 3.0];
var star_vy = [10, 9, 8, 7, 6];
var num_stars = 5;

var canvas_height = 0;
var canvas_width = 0;
var PI = 3.1415926;
var interval = 50;

var zoom = 1.01;
var stars = [];
var outofbound = 0;

class Star {
    constructor(sz, color, x, y, vx, vy){
        this.sz = sz;
        this.color = color;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.tic_count = 0;
    }
    tickOnce(){
        this.tic_count += 1;
        this.x = this.vx*this.tic_count;
        this.y = canvas_height  - (this.vy - 0.05*this.tic_count) * this.tic_count;
        this.sz *= zoom;
    }
    draw(ctx){
        if (this.x > canvas_width || this.y > canvas_height){
            outofbound += 1;
            return;
        }
        var center_x = this.x + this.sz/2;
        var center_y = this.y + this.sz/2;
        var radius = this.sz/2;
        
        ctx.beginPath();
        
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
        
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

// Start button calls this
function start(){
    stop = 0;
    stars = [];
    var i = 0;
    for (i = 0; i < star_sizes.length; ++i){
        stars.push(new Star(star_sizes[i], star_colors[i], 0, canvas_height, star_vx[i], star_vy[i]));
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
    ctx.font = "100px Arial";
    ctx.fillStyle = "#ffaaff";
    ctx.fillText("Happy Birthday", 80, canvas.height - 50);
    
    // calculate
    var i = 0;
    for (i = 0; i < num_stars; ++i){
        var star = stars[i];
        star.tickOnce();
        star.draw(ctx);
    }
    if (outofbound == num_stars){
        // restart
        start();
        return;
    }
    
    setTimeout(drawOnce, interval);
}


