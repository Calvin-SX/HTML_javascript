g = 0.05; // simulate gravity
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
