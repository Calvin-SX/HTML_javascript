function draw(){
    var canvas = document.getElementById("drawCanvas");
    var ctx = canvas.getContext("2d");
    var height = canvas.height;
    var width = canvas.width;
    
    // Always clean up first before draw
    ctx.clearRect(0, 0, width, height);
    var a_x = width/2;
    var a_y = height/4;
    
    var b_dx = width/5;
    var b_x = a_x + b_dx;
    var b_y = height/8;
    
    var c_x = width/2;
    var c_y = 7*height/8;
    
    var d1_dx = width/12;
    var d1_x = a_x + d1_dx;
    var d1_y = height/11;
    
    var d2_dx = b_dx + width/6;
    var d2_x = a_x + d2_dx;
    var d2_y = b_y + height/8;
    
    ctx.beginPath();
    
    ctx.moveTo(a_x, a_y);
    ctx.quadraticCurveTo(d1_x, d1_y, b_x, b_y);
    
    ctx.moveTo(b_x, b_y);
    ctx.quadraticCurveTo(d2_x, d2_y, c_x, c_y);
    
    ctx.moveTo(a_x, a_y);
    b_x = a_x - b_dx;
    d1_x = a_x - d1_dx;
    d2_x = a_x -d2_dx;
    ctx.quadraticCurveTo(d1_x, d1_y, b_x, b_y);
    
    ctx.moveTo(b_x, b_y);
    ctx.quadraticCurveTo(d2_x, d2_y, c_x, c_y);
    
    
    
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();
}

