var note_sizes = [30, 25, 20, 15, 10, 5];
var note_colors = ["#e2b5f7", "#acc4fa", "#fabbac", "#dbfaac", "#fafaac", "#ffabe9"];
var note_vx = [5, 4.5, 4.0, 3.5, 3.0, 2.5];
var note_vy = [10, 9, 8, 7, 6, 5];
var num_notes = note_colors.length;

class musicNote extends Firework{
    
    static getNotes(){
        var notes = [];
        var i = 0;
        for (i = 0; i < num_notes; ++i){
            notes.push(new musicNote(note_sizes[i], note_colors[i], 0, canvas_height, note_vx[i], note_vy[i]));
        }
        return notes;
    }
    draw(ctx){
        if (this.x > canvas_width || this.y > canvas_height){
            outofbound += 1;
            return;
        }
        
        var lineWidth = this.draw_size/20;
        if (lineWidth < 3){
            lineWidth = 3;
        }
        var w = this.draw_size/2.5;
        var h = 0.9*this.draw_size;
        var h_delta = 0.2*this.draw_size;
        
        var center_x = this.x + this.draw_size/2;
        var center_y = this.y + this.draw_size/2;
        
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        
        var lt_x = center_x - w/2;
        var lt_y = center_y - h/2 + h_delta;
        var rt_x = center_x + w/2;
        var rt_y = center_y - h/2;
        
        ctx.moveTo(lt_x, lt_y);
        ctx.lineTo(rt_x, rt_y);
        
        ctx.moveTo(lt_x, lt_y + h_delta);
        ctx.lineTo(rt_x, rt_y + h_delta);
        
        ctx.strokeStyle = this.color;
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(lt_x, lt_y);
        ctx.lineTo(lt_x, lt_y + h - h_delta);
        
        ctx.moveTo(rt_x, rt_y);
        ctx.lineTo(rt_x, rt_y + h - h_delta);
        
        ctx.lineWidth = 2;
        ctx.closePath();
        ctx.stroke();
        
        ctx.beginPath();
        var xr = this.draw_size/20;
        var yr = xr - 1;
        if (yr <= 0) {
            yr = xr;
        }

        ctx.ellipse(lt_x-xr, lt_y + h - h_delta, xr, yr, -Math.PI/6, 0, 2*3.1415);
        ctx.stroke();
        ctx.beginPath();
        ctx.ellipse(rt_x-xr, rt_y + h - h_delta, xr, yr, -Math.PI/6, 0, 2*3.1415);
        ctx.stroke();
    }
}


