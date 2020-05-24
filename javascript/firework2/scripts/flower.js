var flower_sizes = [30, 25, 20, 15, 10, 5];
var flower_colors = ["#e2b5f7", "#acc4fa", "#fabbac", "#dbfaac", "#fafaac", "#ffabe9"];
var flower_vx = [5, 4.5, 4.0, 3.5, 3.0, 2.5];
var flower_vy = [10, 9, 8, 7, 6, 5];
var num_flowers = flower_colors.length;

var num_steps = 100;
var center_scale = 0.14;
var other_scale = 0.20;

class Flower extends Firework{
    // factory method
    static getFlowers(){
        var flowers = [];
        var i = 0;
        for (i = 0; i < num_flowers; ++i){
            flowers.push(new Flower(flower_sizes[i], flower_colors[i], 0, canvas_height, flower_vx[i], flower_vy[i]));
        }
        return flowers;
    }
    drawCircle(ctx, xr, yr, radius){
        var center_x = this.x + xr;
        var center_y = this.y + yr;
        
        var region = new Path2D();
        
        var delta = 2*PI/num_steps;
        var theta = 0;
        
        region.moveTo(center_x + radius, center_y);
        var i = 0;
        for ( i = 0; i < num_steps; ++i){
            theta += delta;
            var to_x = radius * Math.cos(theta) + center_x;
            var to_y = radius * Math.sin(theta) + center_y;
            region.lineTo(to_x, to_y);
        }
        region.closePath();
        ctx.fillStyle = this.color;
        ctx.fill(region, 'nonzero');
    }
    draw(ctx){
        if (this.x > canvas_width || this.y > canvas_height){
            outofbound += 1;
            return;
        }
        var center_radius = this.draw_size * center_scale;
        var other_radius = this.draw_size * other_scale;
        
        this.drawCircle(ctx, this.draw_size/2, this.draw_size/2, center_radius);
        var r = center_radius + other_radius;
        var i = 0;
        var theta = 0;
        var center_x = this.draw_size/2;
        var center_y = this.draw_size/2;
        for (i = 0; i < 5; ++i){
            theta += 2*PI/5;
            var c_x = center_x + r * Math.cos(theta);
            var c_y = center_y + r * Math.sin(theta);
            this.drawCircle(ctx, c_x, c_y, other_radius);
        }
        
    }
}
