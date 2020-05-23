function draw(){
    var canvas = document.getElementById("drawCanvas");
    var ctx = canvas.getContext("2d");
    var height = canvas.height;
    var width = canvas.width;
    
    // Always clean up first before draw
    ctx.clearRect(0, 0, width, height);
    
    var center_x = width/2;
    var center_y = height/2;
    var radius = center_y - 30;
    
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

