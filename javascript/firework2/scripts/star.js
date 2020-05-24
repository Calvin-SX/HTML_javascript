var star_sizes = [30, 25, 20, 15, 10, 5];
var star_colors = ["#fa695d", "#fcac5d", "#fcfa5d", "#a8fc5d", "#5dd6fc", "#ffabe9"];
var star_vx = [5, 4.5, 4.0, 3.5, 3.0, 2.5];
var star_vy = [10, 9, 8, 7, 6, 5];
var num_stars = 6;

class Star extends Firework{
    // factory method
    static getStars(){
        var stars = [];
        var i = 0;
        for (i = 0; i < star_sizes.length; ++i){
            stars.push(new Star(star_sizes[i], star_colors[i], 0, canvas_height, star_vx[i], star_vy[i]));
        }
        return stars;
    }
    
    draw(ctx){
        if (this.x > canvas_width || this.y > canvas_height){
            outofbound += 1;
            return;
        }
        
        var center_x = this.x + this.draw_size/2;
        var center_y = this.y + this.draw_size/2;
        var radius = this.draw_size/2;
        
        //ctx.beginPath();
        var region = new Path2D();
        
        var num_corners = 5;
        var delta = 2*PI*2/num_corners;
        
        var theta = -PI/2;
        var from_x = radius * Math.cos(theta) + center_x;
        var from_y = radius * Math.sin(theta) + center_y;
        
        region.moveTo(from_x, from_y);
        
        var i = 0;
        for (i = 0; i < num_corners; ++i)
        {
            theta += delta;
            var to_x = radius * Math.cos(theta) + center_x;
            var to_y = radius * Math.sin(theta) + center_y;
            
            region.lineTo(to_x, to_y);
            from_x = to_x;
            from_y = to_y;
        }
        region.closePath();
        
        ctx.fillStyle = this.color;
        ctx.fill(region, 'nonzero');
        
    }
}
