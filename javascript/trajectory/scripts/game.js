
// Constants
var g = 0.05; // simulate gravity
var w = 1000;
var h = 800;

var theGame;
var img;

// Draw canvas background
// This is the init function as well
function onload(){

    var c = document.getElementById("drawCanvas");
    // initialize
    w = c.clientWidth;
    h = c.clientHeight;
    var ctx = c.getContext('2d');
    img = new Image();
    
    // host background image in dropbox
    img.src = 'https://www.dropbox.com/s/poh2a3h28de1f9l/gamebg.png?raw=1'
    img.onload = function(){
        ctx.drawImage(img, 0, 0, w, h);
    }

    theGame = new Game();
    // mouse click handler
    c.onclick = startLaunch;
}

function startLaunch(e){

    var c = document.getElementById("drawCanvas");
    var x = e.pageX - c.offsetLeft;
    var y = e.pageY - c.offsetTop;

    if (x < Game.launcherR && y < Game.ground && y > Game.ground - Game.launcherR && theGame.mode == Game.sStart){
        var ctx = c.getContext('2d');
        theGame.launch(ctx, x, y);
        runGame();
    }
}

// Recursive function for animation
var interval = 50;

function runGame(){
    theGame.tickOnce();
    if (theGame.mode != Game.sDone && theGame.mode != Game.sStart){
        // run next iteration
        setTimeout(runGame, interval);
    }
    else {
        // enable start game button
    }
}


class Vir {
    constructor(radius){
        this.r = radius;
        this.cx = 0;
        this.cy = 0;
    }

    get radius() {
        return this.r;
    }

    drawTick(ctx, theta){
        var r1 = this.r;
        var r2 = this.r + 5;
        var r3 = this.r + 6;
    
        var x1 = this.cx + r1*Math.cos(theta);
        var y1 = this.cy + r1*Math.sin(theta);

        var x2 = this.cx + r2*Math.cos(theta);
        var y2 = this.cy + r2*Math.sin(theta);

        var x3 = this.cx + r3*Math.cos(theta);
        var y3 = this.cy + r3*Math.sin(theta);    

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.stroke();
    }
    drawDots(ctx){
        this.drawDots(ctx, 1.0);
    }
    drawDots(ctx, alpha){
        var sz = 4;
        ctx.beginPath();
        ctx.fillRect(this.cx-sz/2, this.cy-sz/2, sz, sz);
        ctx.fillRect(this.cx-sz/2 - this.r/3, this.cy-sz/2 - this.r/3, sz, sz);
        ctx.fillRect(this.cx-sz/2 - this.r/3, this.cy-sz/2 + this.r/3, sz, sz);
        ctx.fillRect(this.cx-sz/2 + this.r/3, this.cy-sz/2 - this.r/3, sz, sz);
        ctx.fillRect(this.cx-sz/2 + this.r/3, this.cy-sz/2 + this.r/3, sz, sz);

        
        ctx.stroke();
    }

    draw(ctx, x, y){
        this.draw(ctx, x, y, 1.0);
    }

    draw(ctx, x, y, alpha){
        this.cx =  x;
        this.cy = y;
        ctx.beginPath();
        ctx.lineWidth = 1;
        
        ctx.globalAlpha = alpha;
        ctx.arc(x, y, this.r, 0, 2*Math.PI);
        ctx.stroke();
        for (var i = 0; i < 12; i++){
            var theta = i*Math.PI/6; // 30 degrees = PI/6
            this.drawTick(ctx, theta);
        }

        this.drawDots(ctx);
    }

    drawExposed(ctx, x, y, scale, alpha){
        this.r = scale*this.r;
        this.draw(ctx, x, y, alpha);
        this.drawDots(ctx, alpha);
    }
}


class Inject {
    constructor(){

    }
    draw(ctx, x, y){
        var nl = 8;
        var bl = 15;
        var tl = 4;
        var bw = 6;
        var tw = bw - 2;

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.globalAlpha = 1.0;
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - nl);

        ctx.moveTo(x-bw/2, y - nl);
        ctx.lineTo(x+bw/2, y - nl);
        ctx.lineTo(x+bw/2, y - nl - bl);
        
        ctx.moveTo(x-bw/2, y - nl);
        ctx.lineTo(x-bw/2, y - nl -bl);
        ctx.lineTo(x+bw/2, y - nl -bl);

        ctx.moveTo(x-bw/2+1, y - nl - bl);
        ctx.lineTo(x-bw/2+1, y - nl - bl - tl)

        ctx.moveTo(x+bw/2-1, y - nl - bl);
        ctx.lineTo(x+bw/2-1, y - nl - bl - tl);

        ctx.moveTo(x-bw/2-1, y -nl - bl - tl);
        ctx.lineTo(x+bw/2+1, y -nl - bl - tl)

        ctx.stroke();
    }
}


class Launcher {
    constructor(){
        this.x = 0;
        this.y = Game.ground;
    }
    set(x, y){
        this.x = x;
        this.y = y;
    }

    drawGround(ctx){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(0, Game.ground);
        ctx.lineTo(1000, Game.ground);
        ctx.stroke();
    }

    drawLauncher(ctx) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(0, Game.ground, Game.launcherR, 1.5*Math.PI, 2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(0, Game.ground);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    }

    draw(ctx){
        this.drawGround(ctx);
        this.drawLauncher(ctx);
    }
}

class Game {
    static sStart   = 0;
    static sFlying  = 1;
    static sHit     = 2;
    static sMissed  = 3;
    static sDone    = -1;
    static ground   = 500;
    static launcherR= 30;

    constructor(){
        this.virX       = 200;
        this.virSz      = 20;
        this.mode       = Game.sDone;
        this.injX       = 0;
        this.injY       = 0;
        this.vX         = 0;
        this.vY         = 0;
        this.virCounter = 0;

        this.inj = new Inject();
        this.vir = new Vir(this.virSz);
        this.lau = new Launcher();
    }

    getClearCtx(){
        var canvas = document.getElementById("drawCanvas");
        var canvas_height = canvas.height;
        var canvas_width = canvas.width;
    
        var ctx = canvas.getContext("2d");
        ctx.globalAlpha = 1.0;
        // Always clean up whole canvas first before draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 1000, 800);

        this.lau.draw(ctx);

        return ctx;
    }

    randomX(){
        return 500 + 500*Math.random();
    }

    startGame(ctx){
        this.mode = Game.sStart;
        this.vir.r = this.virSz;
        this.virCounter = 0;
        this.virX = this.randomX();
        this.vir.draw(ctx, this.virX, Game.ground);
        this.lau.set(0, Game.ground);
        this.lau.draw(ctx);
    }

    launch(ctx, x, y){
        this.injX = x;
        this.injY = y;
        this.vX = x/2;
        this.vY = (y - Game.ground)/2;

        this.lau.set(x, y);

        this.inj.draw(ctx, this.injX, this.injY);
        this.mode = Game.sFlying;
    }

    moveInj(){
        this.injX += this.vX;
        this.vY += g;
        this.injY += this.vY;
    }


    tickOnce(){
        var ctx = this.getClearCtx();
        if (this.mode == Game.sFlying){
            // flying
            this.moveInj();
            this.inj.draw(ctx, this.injX, this.injY);
            this.vir.draw(ctx, this.virX, Game.ground);

            if (this.injY >= Game.ground){
                // hit ground
                if (Math.abs(this.injX - this.virX) < this.virSz/2){
                    // reset exp counter
                    this.virCounter = 0;
                    this.mode = Game.sHit;
                }
                else {
                    this.mode = Game.sMissed;
                    //this.mode = Game.sHit;
                }
            }
            else if (this.injY >= Game.ground - this.virSz && Math.abs(this.injX - this.virX) < this.virSz/2){
                // reset exp counter
                this.virCounter = 0;
                this.mode = Game.sHit;
            }
        }
        else if (this.mode == Game.sHit){

            if (this.virCounter == 0){
                this.vir.drawExposed(ctx, this.virX, Game.ground, 0.8, 1.0);
            }
            else if (this.virCounter < 6){
                var scale = 0.1*(this.virCounter - 1) + 1;
                var alpha = 1 - this.virCounter/5;
                this.vir.drawExposed(ctx, this.virX, Game.ground, scale, alpha);
            }
            else {
                this.mode = Game.sDone;
            }
            this.virCounter += 1;
        }
        else if (this.mode == Game.sMissed){
            this.mode = Game.sStart;
            this.lau.set(0, Game.gound);
            this.vir.draw(ctx, this.virX, Game.ground);
        }
    }
}

// main function
var tick = 0;
function start(){
    // reset counter
    tick = 0;

    // get the canvas and context
    var c = document.getElementById("drawCanvas");
    var ctx = c.getContext('2d');

    theGame.startGame(ctx);
}



























class Firework{
    constructor(sz, color, x, y, vx, vy){
        this.sz = sz;
        this.color = color;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.tic_count = 0;
        this.draw_size = 5;
        this.top = this.vy/g/2;
    }
    tickOnce(){
        this.tic_count += 1;
        this.x = this.vx*this.tic_count;
        this.y = canvas_height  - (this.vy - g*this.tic_count) * this.tic_count;
        this.sz *= zoom;
        
        // Draw_size is constant 5 before reaching the top.
        // Change to this.sz after that.
        this.draw_size = 5;
        if (this.tic_count > 0)
        {
            if (this.tic_count >= this.top){
                this.draw_size = this.sz;
            }
        }
    }
    drawTrack(ctx){
        // recompute x and y
        ctx.beginPath();
        var x = 0;
        var y = 0;
        var tic_count = 0;
        // start the track 20 points before the current location
        var start = this.tic_count - 20;
        if (start < 0){
            start = 0;
        }
        x = this.vx*start;
        y = canvas_height  - (this.vy - 0.05*start) * start;
        ctx.moveTo(x, y);
        for (tic_count = start + 1; tic_count < this.tic_count; ++tic_count){
            x = this.vx*tic_count;
            y = canvas_height  - (this.vy - 0.05*tic_count) * tic_count;
            ctx.lineTo(x, y);
            ctx.moveTo(x, y);
        }
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}
